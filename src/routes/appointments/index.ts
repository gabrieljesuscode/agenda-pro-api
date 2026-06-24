import { Router } from 'express';
import { AppointmentsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const AppointmentsRouter = Router();

AppointmentsRouter.use('/appointments', auth);

// Appointments CRUD
AppointmentsRouter.post('/appointments', AppointmentsController.createValidation, AppointmentsController.create);
AppointmentsRouter.get('/appointments', AppointmentsController.listValidation, AppointmentsController.list);
AppointmentsRouter.patch('/appointments/:id');
AppointmentsRouter.delete('/appointments/:id', AppointmentsController.deleteByIdValidation, AppointmentsController.deleteById);

export { AppointmentsRouter };
