import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';


export const deleteById = async (appointmentId: string, userId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
      userId: userId
    }
  });


  if (!appointment) throw new AppError(
    'invalid id',
    400
  );


  return await prisma.appointment.delete({
    where: {
      id: appointmentId,
      userId: userId
    }
  });
};
