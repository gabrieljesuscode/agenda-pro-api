import { Router } from 'express';
import { AppointmentsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const AppointmentsRouter = Router();

AppointmentsRouter.use(auth);

// Appointments CRUD
AppointmentsRouter.post('/appointments', AppointmentsController.createValidation, AppointmentsController.create);
AppointmentsRouter.get('/appointments', AppointmentsController.listValidation, AppointmentsController.list);

export { AppointmentsRouter };
