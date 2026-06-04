import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AuthService } from '../../../shared/services';

const userRegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3)
});

type TUser = z.infer<typeof userRegisterSchema>;


export const registerValidation = validation({ body: userRegisterSchema });


export const register: RequestHandler<unknown, unknown, TUser> = async (req, res) => {

  const user = await AuthService.register(req.body);

  return res.status(201).json(user);
};
