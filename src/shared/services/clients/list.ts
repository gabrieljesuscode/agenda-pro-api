import { prisma } from '../../../database/prisma/prisma';
import type { Prisma } from '../../../generated/prisma/client';

type TQuerySchema = Partial<{
  page: number
  limit: number
  filter: string
}>;


export const list = async (userId: string, query: TQuerySchema) => {

  const { page = 1, limit = 10, filter } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const where: Prisma.ClientWhereInput = {
    userId,
  };

  if (filter) {
    where.name = {
      contains: filter,
      mode: 'insensitive',
    };
  }

  const clients = await prisma.client.findMany({
    where,
    omit: {
      userId: true,
      createdAt: true,
      updatedAt: true
    },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber
  });

  const total = await prisma.client.count({
    where,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    page: pageNumber,
    limit: limitNumber,
    filter: filter ? filter : null,
    total,
    totalPages,
    clients
  };
};
