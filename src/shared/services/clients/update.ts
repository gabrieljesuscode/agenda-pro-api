import { prisma } from '../../../database/prisma/prisma';

type UpdateClientDTO = Partial<{
  name: string
  phone: string
  email: string
}>;

export const update = async (clientId: string, data: UpdateClientDTO, userId: string) => {

  const clientFound = await prisma.client.findUnique({
    where: {
      id: clientId,
      userId: userId
    }
  });

  // Se o id não existir ele não atualiza
  if (!clientFound) return undefined;

  return await prisma.client.update({
    where: {
      id: clientId,
      userId: userId
    },
    data
  });
};
