import { prisma } from '../../../../database/prisma/prisma';
import * as bcrypt from 'bcrypt';
import { AppError } from '../../../../errors/AppError';

export interface UserRegisterDTO {
  name: string
  email: string
  password: string
}

const generateHash = async (password: string) => {

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(password, salt);
};

export const register = async (data: UserRegisterDTO) => {
  // Verifica se email já está cadastrado
  const userRegistered = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  // Erro com status code caso já exista um email no db
  if (userRegistered) {
    throw new AppError(
      'Email já cadastrado',
      409
    );
  }

  // Gera o hash da senha e se já existir lança um erro personalizado com status code
  const hash = await generateHash(data.password);

  if (userRegistered) {
    throw new AppError(
      'Erro ao gerar hash',
      500
    );
  }

  // Cria o user sem erros
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hash
    },
  });
};
