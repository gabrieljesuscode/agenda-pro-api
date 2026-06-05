import { Router } from 'express';
import { AuthController, ClientsController } from '../controllers';
import { auth } from '../shared/middlewares/auth';

const router = Router();

// Clients CRUD
router.post('/clients', auth, ClientsController.createValidation, ClientsController.create);
router.get('/clients', auth, ClientsController.listValidation, ClientsController.list);
router.get('/clients/:id', auth, ClientsController.getByIdValidation, ClientsController.getById);
router.patch('/clients/:id', auth, ClientsController.updateValidation, ClientsController.update);
router.delete('/clients/:id', auth, ClientsController.deleteByIdValidation, ClientsController.deleteById);

// Auth register && login
router.post('/auth/register', AuthController.registerValidation, AuthController.register);
router.post('/auth/login', AuthController.loginValidation, AuthController.login);

export { router };
