import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AuthService } from '../../../shared/services';
import { AppError } from '../../../errors/AppError';

const userSchema = z.object({
  email: z.email(),
  password: z.string()
});

type TUser = z.infer<typeof userSchema>;


export const loginValidation = validation({ body: userSchema });


export const login: RequestHandler<unknown, unknown, TUser> = async (req, res) => {
  try {
    // Pesquisa o usuário e trata os erros
    const user = await AuthService.login(req.body);

    return res.status(201).json(user);

  } catch (error) {
    // Se for um erro não previsto lança erro 500
    if (!(error instanceof AppError)) return res.status(500).json({
      error: 'Internal Server Error'
    });

    // Para erro previsto lança mensagem personalizada
    return res.status(error.statusCode).json({ error: error.message });
  }

};
