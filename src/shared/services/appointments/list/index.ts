import { prisma } from '../../../../database/prisma/prisma';

export const list = async (userId: string) => {
  // Mostra agendamentos com o cliente que está agendado
  // Esconde o user id e o client id
  return await prisma.appointment.findMany({
    where: {
      userId
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      }
    },

    omit: {
      clientId: true
    }
  });
};
