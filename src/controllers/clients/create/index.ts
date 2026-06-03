import { type Request, type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { createClientService } from '../../../shared/services/createClientService';

const createClientSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  phone: z.string().min(9)
});

type Client = z.infer<typeof createClientSchema>;


export const createValidation = validation({ body: createClientSchema });


export const create: RequestHandler = async (req: Request<unknown, unknown, Client>, res) => {

  const client = await createClientService(req.body);

  return res.status(201).json(client);
};
