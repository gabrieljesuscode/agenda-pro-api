import { Router } from 'express';
import { AuthController, ClientsController } from '../controllers';

const router = Router();

// Clients CRUD
router.post('/clients', ClientsController.createValidation, ClientsController.create);
router.get('/clients', ClientsController.listValidation, ClientsController.list);
router.get('/clients/:id', ClientsController.getByIdValidation, ClientsController.getById);
router.patch('/clients/:id', ClientsController.updateValidation, ClientsController.update);
router.delete('/clients/:id', ClientsController.deleteByIdValidation, ClientsController.deleteById);

// Auth register && login
router.post('/auth/register', AuthController.registerValidation, AuthController.register);

export { router };
