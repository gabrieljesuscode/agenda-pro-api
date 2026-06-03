import { prisma } from '../../database/prisma/prisma';


export const deleteByIdClientService = async (id: string) => {
  const clientFound = await prisma.client.findUnique({
    where: { id }
  });

  if (!clientFound) return undefined;

  return await prisma.client.delete({
    where: { id }
  });
};
