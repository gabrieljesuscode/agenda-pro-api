import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prisma/prisma';

describe('Clients endpoints', () => {
    it('deve criar e listar clientes', async () => {
        const email = `user${Date.now()}@gmail.com`;
        const clientEmail = `client${Date.now()}@example.com`;

        // Registra o usuário
        const register = await request(app)
            .post('/auth/register')
            .send({ name: 'username', email, password: 'password123' });

        const userId = register.body.id;

        // Autentica
        const login = await request(app)
            .post('/auth/login')
            .send({ email, password: 'password123' });

        const token = login.body.token;

        // Cria cliente
        const create = await request(app)
            .post('/clients')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Cliente Test', email: clientEmail, phone: '601-464-5299' });

        expect(create.status).toBe(201);
        expect(create.body).toHaveProperty('id');

        // Lista clientes
        const list = await request(app)
            .get('/clients')
            .set('Authorization', `Bearer ${token}`);

        expect(list.status).toBe(200);
        expect(list.body).toHaveProperty('page');
        expect(list.body).toHaveProperty('clients');
        expect(Array.isArray(list.body.clients)).toBe(true);

        // Cleanup
        await prisma.appointment.deleteMany({ where: { userId } });
        await prisma.client.deleteMany({ where: { userId } });
        await prisma.user.deleteMany({ where: { id: userId } });
    });

    it('não deve listar clientes sem token', async () => {
        const response = await request(app)
            .get('/clients');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('não deve buscar cliente inexistente', async () => {
        const email = `user${Date.now()}@gmail.com`;

        const register = await request(app)
            .post('/auth/register')
            .send({ name: 'username', email, password: 'password123' });

        const userId = register.body.id;

        const login = await request(app)
            .post('/auth/login')
            .send({ email, password: 'password123' });

        const token = login.body.token;

        const response = await request(app)
            .get('/clients/00000000-0000-0000-0000-000000000000')
            .set('Authorization', `Bearer ${token}`);

        await prisma.user.deleteMany({ where: { id: userId } });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
