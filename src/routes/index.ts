import { Router } from 'express';
import { ClientsRouter } from './clients';
import { AppointmentsRouter } from './appointments';
import { AuthRouter } from './auth';
import { DashboardRouter } from './dashboard';

const router = Router();

router.use(ClientsRouter);
router.use(AuthRouter);
router.use(AppointmentsRouter);
router.use(DashboardRouter);

export { router };
