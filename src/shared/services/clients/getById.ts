import { prisma } from '../../../database/prisma/prisma';


export const getById = async (id: string) => {
  return await prisma.client.findUnique({
    where: { id }
  });
};
