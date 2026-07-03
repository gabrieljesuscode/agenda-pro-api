import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prisma/prisma';

describe('POST /auth/login', () => {
  it('deve autenticar um usuário com sucesso', async () => {
    const email = `user${Date.now()}@gmail.com`;

    // Registra o usuário primeiro
    await request(app)
      .post('/auth/register')
      .send({
        name: 'username',
        email,
        password: 'password123',
      });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email,
        password: 'password123',
      });

    await prisma.user.deleteMany({ where: { email } });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('não deve autenticar com credenciais inválidas', async () => {
    const email = `user${Date.now()}@gmail.com`;

    // Não registra usuário — credenciais inválidas
    const response = await request(app)
      .post('/auth/login')
      .send({
        email,
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
