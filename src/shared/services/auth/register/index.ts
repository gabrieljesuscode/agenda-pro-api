import { prisma } from '../../../../database/prisma/prisma';
import * as bcrypt from 'bcrypt';

export interface UserRegisterDTO {
  name: string
  email: string
  password: string
}

export const register = async (data: UserRegisterDTO) => {

  // const userRegistered = await prisma.user.findFirst({
  //   where: {
  //     email: data.email
  //   }
  // });

  // if (userRegistered) return undefined;

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  if (!salt) return undefined;

  const hash = await bcrypt.hash(data.password, salt);

  if (!hash) return undefined;

  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hash
    },
  });
};
