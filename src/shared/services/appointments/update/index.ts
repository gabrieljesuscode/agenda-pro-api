import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';

type UpdateAppointmentDTO = Partial<{
  title: string
  date: Date
  clientId: string
}>;

export const update = async (appointmentId: string, userId: string, data: UpdateAppointmentDTO) => {

  const appointmentFound = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
      userId: userId
    }
  });

  // Se o id não existir ele não atualiza
  if (!appointmentFound) throw new AppError(
    'invalid id',
    400
  );

  // Verifica se o client existe 
  if (data.clientId) {
    const client = await prisma.client.findUnique({
      where: {
        id: data.clientId
      }
    });

    if (!client) throw new AppError(
      'invalid client id',
      400
    );
  };


  return await prisma.appointment.update({
    where: {
      id: appointmentId,
      userId: userId
    },
    data
  });
};
