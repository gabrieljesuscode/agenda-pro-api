import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { ClientsService } from '../../../shared/services';

const paramsSchema = z.object({
  id: z.string()
});

type TParamsProps = z.infer<typeof paramsSchema>;


export const getByIdValidation = validation({ params: paramsSchema });


export const getById: RequestHandler<TParamsProps> = async (req, res) => {

  const client = await ClientsService.getById(req.params.id, res.locals.userId);

  if (!client) return res.status(400).json({ error: 'invalid id' });

  return res.status(200).json(client);
};
