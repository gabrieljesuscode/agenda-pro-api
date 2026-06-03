import { prisma } from '../../database/prisma/prisma';

export const listClientService = async () => {
  return await prisma.client.findMany();
};
