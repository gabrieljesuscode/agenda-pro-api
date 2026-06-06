import { prisma } from '../../../../database/prisma/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../errors/AppError';
import 'dotenv/config';

export interface UserLoginDTO {
  email: string
  password: string
};

const generateToken = (id: string) => {
  return jwt.sign(
    {
      userId: id
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '7d'
    }
  );
};

export const login = async (data: UserLoginDTO) => {
  // Procura o user no banco de dados
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  // Lança erro personalizado se não encontrar
  if (!user) {
    throw new AppError('Email ou senha inválidos', 400);
  }

  // User encontrado
  // Compara senhas
  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError('Email ou senha inválidos', 400);
  };

  return {
    token: generateToken(user.id)
  };
};
