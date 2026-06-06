import { prisma } from '../../../database/prisma/prisma';


export const getById = async (clientId: string, userId: string) => {
  return await prisma.client.findUnique({
    where: {
      id: clientId,
      userId: userId
    }
  });
};
