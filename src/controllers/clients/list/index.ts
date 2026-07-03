import { type RequestHandler } from 'express';
import { validation } from '../../../shared/middlewares/validation';
import * as z from 'zod';
import { ClientsService } from '../../../shared/services';

const querySchema = z.object({
  page: z.coerce.number().gt(0).optional(),
  limit: z.coerce.number().gt(0).optional(),
  filter: z.string().optional()
});

type TQuerySchema = Partial<{
  page: number
  limit: number
  filter: string
}>;

export const listValidation = validation({
  query: querySchema
});

export const list: RequestHandler<unknown, unknown, unknown, TQuerySchema> = async (req, res) => {

  const clientsList = await ClientsService.list(res.locals.userId, req.query);

  return res.status(200).json(clientsList);
};  
