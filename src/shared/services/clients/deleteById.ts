import { prisma } from '../../../database/prisma/prisma';


export const deleteById = async (clientId: string, userId: string) => {
  const clientFound = await prisma.client.findUnique({
    where: {
      id: clientId,
      userId: userId
    }
  });

  if (!clientFound) return undefined;

  return await prisma.client.delete({
    where: {
      id: clientId,
      userId: userId
    }
  });
};
