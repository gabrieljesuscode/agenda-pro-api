import { type Request, type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { ClientsService } from '../../../shared/services';

const clientSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  phone: z.string().min(9)
});

type Client = z.infer<typeof clientSchema>;


export const createValidation = validation({ body: clientSchema });


export const create: RequestHandler = async (req: Request<unknown, unknown, Client>, res) => {

  const client = await ClientsService.create(req.body);

  return res.status(201).json(client);
};
