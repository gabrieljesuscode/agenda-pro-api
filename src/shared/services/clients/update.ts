import { prisma } from '../../../database/prisma/prisma';

type UpdateClientDTO = Partial<{
  name: string
  phone: string
  email: string
}>;

export const update = async (id: string, data: UpdateClientDTO) => {

  const clientFound = await prisma.client.findUnique({
    where: { id }
  });

  // Se o id não existir ele não atualiza
  if (!clientFound) return undefined;

  return await prisma.client.update({
    where: { id },
    data
  });
};
