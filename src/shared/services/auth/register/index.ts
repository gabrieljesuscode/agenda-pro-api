import { prisma } from '../../../../database/prisma/prisma';

export interface UserRegisterDTO {
  name: string
  email: string
  password: string
}

export const register = async (data: UserRegisterDTO) => {
  return await prisma.user.create({
    data,
  });
};
