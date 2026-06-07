import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';

export interface CreateAppointmentDTO {
  title: string
  date: string
  clientId: string
}

export const create = async (data: CreateAppointmentDTO, userId: string) => {

  // Verificar se o cliente pertence mesmo ao usuário autenticado
  const cliente = await prisma.client.findFirst({
    where: {
      userId
    }
  });

  if (!cliente) throw new AppError(
    'Cliente não encontrado',
    404
  );

  // Criar agendamento
  return await prisma.appointment.create({
    data: {
      ...data,
      userId: userId
    },
  });
};
