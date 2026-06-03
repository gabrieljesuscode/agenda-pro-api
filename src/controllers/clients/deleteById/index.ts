import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { deleteByIdClientService } from '../../../shared/services/deleteByIdClientService';

const paramsSchema = z.object({
  id: z.string()
});

type TParamsProps = z.infer<typeof paramsSchema>;


export const deleteByIdValidation = validation({ params: paramsSchema });


export const deleteById: RequestHandler<TParamsProps> = async (req, res) => {

  const client = await deleteByIdClientService(req.params.id);

  if (!client) return res.status(400).json({ error: 'invalid id' });

  return res.status(204).json(client);
};
