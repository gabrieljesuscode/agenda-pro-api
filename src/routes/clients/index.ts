import { Router } from 'express';
import { ClientsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const ClientsRouter = Router();

ClientsRouter.use(auth);

// Clients CRUD
ClientsRouter.post('/clients', ClientsController.createValidation, ClientsController.create);
ClientsRouter.get('/clients', ClientsController.listValidation, ClientsController.list);
ClientsRouter.get('/clients/:id', ClientsController.getByIdValidation, ClientsController.getById);
ClientsRouter.patch('/clients/:id', ClientsController.updateValidation, ClientsController.update);
ClientsRouter.delete('/clients/:id', ClientsController.deleteByIdValidation, ClientsController.deleteById);

export { ClientsRouter };
