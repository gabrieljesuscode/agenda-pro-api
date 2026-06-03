import { prisma } from '../../database/prisma/prisma';


export const getByIdClientService = async (id: string) => {
  return await prisma.client.findUnique({
    where: { id }
  });
};
