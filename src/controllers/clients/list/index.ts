import { type RequestHandler } from 'express';
import { validation } from '../../../shared/middlewares/validation';
import * as z from 'zod';
import { ClientsService } from '../../../shared/services';

const querySchema = z.object({
  page: z.number().gt(0).optional(),
  limit: z.number().gt(0).optional(),
  filter: z.string().optional()
});

export const listValidation = validation({
  query: querySchema
});

export const list: RequestHandler = async (_, res) => {

  const clientsList = await ClientsService.list();

  return res.status(200).json(clientsList);
};  
