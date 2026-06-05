import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AuthService } from '../../../shared/services';
import { AppError } from '../../../errors/AppError';

const userRegisterSchema = z.object({
  name: z.string().min(3),
  email: z.email().min(3),
  password: z.string().min(3)
});

type TUser = z.infer<typeof userRegisterSchema>;


export const registerValidation = validation({ body: userRegisterSchema });


export const register: RequestHandler<unknown, unknown, TUser> = async (req, res) => {
  try {
    // Cria o usuário e trata os erros
    const user = await AuthService.register(req.body);

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    // Se for um erro não previsto lança erro 500
    if (!(error instanceof AppError)) return res.status(500).json({
      error: 'Internal Server Error'
    });

    // Para erro previsto lança mensagem personalizada
    return res.status(error.statusCode).json({ error: error.message });
  }

};
