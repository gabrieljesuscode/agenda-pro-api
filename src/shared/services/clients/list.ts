import { prisma } from '../../../database/prisma/prisma';

export const list = async () => {
  return await prisma.client.findMany();
};
