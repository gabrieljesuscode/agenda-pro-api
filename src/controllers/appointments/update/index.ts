import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AppointmentsService } from '../../../shared/services';
import { AppError } from '../../../errors/AppError';

const paramsSchema = z.object({
  id: z.string()
});

const bodySchema = z.object({
  title: z.string().min(3).optional(),
  date: z.iso.datetime().optional(),
  clientId: z.uuid().optional()
});

type TParamsProps = z.infer<typeof paramsSchema>;


// Type diferente para o body para não conflitar com o tipo de updateClientService
type UpdateAppointmentDTO = Partial<{
  title: string
  date: Date
  clientId: string
}>;


export const updateValidation = validation({
  params: paramsSchema,
  body: bodySchema
});


export const update: RequestHandler<TParamsProps, unknown, UpdateAppointmentDTO> = async (req, res) => {
  try {
    // Atualiza o agendamento e trata os erros
    const appointment = await AppointmentsService.update(req.params.id, res.locals.id, req.body);

    return res.status(201).json(appointment);

  } catch (error) {
    console.log(error);
    // Se for um erro não previsto lança erro 500
    if (!(error instanceof AppError)) return res.status(500).json({
      error: 'Internal Server Error'
    });

    // Para erro previsto lança mensagem personalizada
    return res.status(error.statusCode).json({ error: error.message });
  }

};
