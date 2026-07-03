import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prisma/prisma';

describe('Appointments endpoints', () => {
    it('deve criar um agendamento', async () => {
        const email = `user${Date.now()}@gmail.com`;
        const clientEmail = `client${Date.now()}@example.com`;

        // Registra e autentica usuário
        const register = await request(app)
            .post('/auth/register')
            .send({ name: 'username', email, password: 'password123' });

        const userId = register.body.id;

        const login = await request(app)
            .post('/auth/login')
            .send({ email, password: 'password123' });

        const token = login.body.token;

        // Cria cliente necessário
        const createClient = await request(app)
            .post('/clients')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Cliente A', email: clientEmail, phone: '601-464-5299' });

        const clientId = createClient.body.id;

        // Cria agendamento
        const appointmentDate = new Date(Date.now() + 1000 * 60 * 60).toISOString();
        const create = await request(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Consulta', date: appointmentDate, clientId });

        expect(create.status).toBe(201);
        expect(create.body).toHaveProperty('id');

        // Cleanup
        await prisma.appointment.deleteMany({ where: { userId } });
        await prisma.client.deleteMany({ where: { userId } });
        await prisma.user.deleteMany({ where: { id: userId } });
    });

    it('não deve criar agendamento sem token', async () => {
        const response = await request(app)
            .post('/appointments')
            .send({ title: 'Consulta', date: new Date().toISOString(), clientId: '00000000-0000-0000-0000-000000000000' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('não deve atualizar agendamento inexistente', async () => {
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
            .patch('/appointments/00000000-0000-0000-0000-000000000000')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Atualizado' });

        await prisma.user.deleteMany({ where: { id: userId } });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
