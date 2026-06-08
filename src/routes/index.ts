import { Router } from 'express';
import { ClientsRouter } from './clients';
import { AppointmentsRouter } from './appointments';
import { AuthRouter } from './auth';
import { DashboardRouter } from './dashboard';

const router = Router();

// Endpoints
// Rota de Clientes
router.use(ClientsRouter);
// Rota de autenticação
router.use(AuthRouter);
// Rota de agendamento
router.use(AppointmentsRouter);
// Rota de dashboard
router.use(DashboardRouter);

export { router };
