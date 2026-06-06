import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { ClientsService } from '../../../shared/services';

const paramsSchema = z.object({
  id: z.string()
});

const bodySchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().min(3).optional(),
  phone: z.string().min(9).optional()
});

type TParamsProps = z.infer<typeof paramsSchema>;

// Type diferente para o body para não conflitar com o tipo de updateClientService
type UpdateClientDTO = Partial<{
  name: string
  phone: string
  email: string
}>;


export const updateValidation = validation({
  params: paramsSchema,
  body: bodySchema
});


export const update: RequestHandler<TParamsProps, unknown, UpdateClientDTO> = async (req, res) => {

  const client = await ClientsService.update(req.params.id, req.body, res.locals.id);

  if (!client) return res.status(400).json({ error: 'invalid id' });

  return res.status(201).json(client);
};
