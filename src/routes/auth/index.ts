import { Router } from 'express';
import { AuthController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const AuthRouter = Router();

AuthRouter.use(auth);

// Auth register && login
AuthRouter.post('/auth/register', AuthController.registerValidation, AuthController.register);
AuthRouter.post('/auth/login', AuthController.loginValidation, AuthController.login);

export { AuthRouter };
