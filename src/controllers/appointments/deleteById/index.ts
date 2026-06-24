import { type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AppointmentsService } from '../../../shared/services';
import { AppError } from '../../../errors/AppError';

const paramsSchema = z.object({
  id: z.uuid()
});

type TParamsProps = z.infer<typeof paramsSchema>;


export const deleteByIdValidation = validation({ params: paramsSchema });


export const deleteById: RequestHandler<TParamsProps> = async (req, res) => {
  try {
    // Deleta o agendamento e trata os erros
    const appointment = await AppointmentsService.deleteById(req.params.id, res.locals.userId);

    return res.status(204).json(appointment);

  } catch (error) {

    // Se for um erro não previsto lança erro 500
    if (!(error instanceof AppError)) return res.status(500).json({
      error: 'Internal Server Error'
    });

    // Para erro previsto lança mensagem personalizada
    return res.status(error.statusCode).json({ error: error.message });
  }


};
