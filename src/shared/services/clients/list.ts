import { prisma } from '../../../database/prisma/prisma';

export const list = async (id: string) => {
  return await prisma.client.findMany({
    where: {
      userId: id
    }
  });
};
