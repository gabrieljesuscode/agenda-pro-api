import { prisma } from '../../database/prisma/prisma';

interface CreateClientDTO {
  name: string
  email?: string
  phone: string
}

export const createClientService = async (data: CreateClientDTO) => {
  return await prisma.client.create({
    data,
  });
};
