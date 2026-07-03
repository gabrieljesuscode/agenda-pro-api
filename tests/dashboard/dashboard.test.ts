import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database/prisma/prisma';

describe('Dashboard endpoints', () => {
    it('deve retornar resumo e próximos agendamentos', async () => {
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

        // Cria cliente
        const createClient = await request(app)
            .post('/clients')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Cliente B', email: clientEmail, phone: '601-464-5299' });

        const clientId = createClient.body.id;

        // Cria agendamento futuro
        const appointmentDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
        await request(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Consulta Futuro', date: appointmentDate, clientId });

        // GET /dashboard
        const summary = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${token}`);

        expect(summary.status).toBe(200);
        expect(summary.body).toHaveProperty('totalClients');

        // GET /dashboard/upcoming
        const upcoming = await request(app)
            .get('/dashboard/upcoming')
            .set('Authorization', `Bearer ${token}`);

        expect(upcoming.status).toBe(200);
        expect(Array.isArray(upcoming.body)).toBe(true);

        // Cleanup
        await prisma.appointment.deleteMany({ where: { userId } });
        await prisma.client.deleteMany({ where: { userId } });
        await prisma.user.deleteMany({ where: { id: userId } });
    });

    it('não deve acessar dashboard sem token', async () => {
        const response = await request(app)
            .get('/dashboard');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('não deve acessar próximos agendamentos com token inválido', async () => {
        const response = await request(app)
            .get('/dashboard/upcoming')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    });
});
