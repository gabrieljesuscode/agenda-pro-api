import { type Request, type RequestHandler } from 'express';
import * as z from 'zod';
import { validation } from '../../../shared/middlewares/validation';
import { AppointmentsService } from '../../../shared/services';

const appointmentSchema = z.object({
  title: z.string(),
  date: z.string(),
  clientId: z.string()
});

type TAppointment = z.infer<typeof appointmentSchema>;


export const createValidation = validation({ body: appointmentSchema });


export const create: RequestHandler = async (req: Request<unknown, unknown, TAppointment>, res) => {
  try {

    const appointment = await AppointmentsService.create(req.body, res.locals.userId);

    return res.status(201).json(appointment);

  } catch {

    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
