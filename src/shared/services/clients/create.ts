import { prisma } from '../../../database/prisma/prisma';

export interface CreateClientDTO {
  name: string
  email?: string
  phone: string
}

export const create = async (data: CreateClientDTO) => {
  return await prisma.client.create({
    data,
  });
};
