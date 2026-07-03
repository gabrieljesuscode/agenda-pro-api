import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prisma/prisma';

describe('POST /auth/register', () => {
  it('deve registrar um novo usuário com sucesso', async () => {
    const email = `user${Date.now()}@gmail.com`;

    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'username',
        email,
        password: 'password123',
      });

    await prisma.user.deleteMany({
      where: {
        email,
      },
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('username');
    expect(response.body.email).toBe(email);
    expect(response.body.id).toBeDefined();
  });

  it('não deve registrar usuário com email já existente', async () => {
    const email = `user${Date.now()}@gmail.com`;

    await request(app)
      .post('/auth/register')
      .send({
        name: 'username',
        email,
        password: 'password123',
      });

    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'username',
        email,
        password: 'password123',
      });

    await prisma.user.deleteMany({
      where: {
        email,
      },
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });
});
