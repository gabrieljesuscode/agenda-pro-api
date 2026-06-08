
import { Router } from 'express';
import { auth } from '../../shared/middlewares/auth';
import { DashboardController } from '../../controllers';

const DashboardRouter = Router();

DashboardRouter.use(auth);

// Dashboard 
DashboardRouter.get('/dashboard', DashboardController.getSummary);
DashboardRouter.get('/dashboard/upcoming', DashboardController.upcoming);

export { DashboardRouter };
