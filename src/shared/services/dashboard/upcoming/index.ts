import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';


export const upcoming = async (userId: string) => {
  // Procura o user e lança erro se não existir
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) throw new AppError('Usuário não encontrado', 404);


  // Retorna o summary do user 
  return await prisma.appointment.findMany({
    where: {
      userId,
      date: {
        gt: new Date()
      }
    },

    orderBy: {
      date: 'asc'
    },

    take: 5,

    select: {
      id: true,
      title: true,
      date: true,

      client: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  // [
  //   {
  //     "id": "...",
  //     "title": "Consulta",
  //     "date": "2026-06-15T14:00:00Z",
  //     "client": {
  //       "id": "...",
  //       "name": "João"
  //     }
  //   }
  // ]
}; 
