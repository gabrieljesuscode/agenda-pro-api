import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { prisma } from '../../database/prisma/prisma';


const verifyUserToken = async (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    ) as {
      userId: string
    };

    if (!payload.userId) return null;

    return await prisma.user.findUnique({
      where: {
        id: payload.userId
      }
    });
  } catch {
    return null;
  }
};

export const auth: RequestHandler = async (req, res, next) => {

  const authorization = req.headers.authorization;

  const token: string | undefined = authorization ? authorization.split(' ')[1] : undefined;

  if (!token) return res.status(400).json(
    {
      error: 'token não informado',
    }
  );

  // Verifica se o token é válido e trata erro
  const user = await verifyUserToken(token);

  if (!user) return res.status(401).json(
    {
      error: 'Token inválido'
    }
  );

  // Guarda o userId na requisição
  res.locals.userId = user.id;

  // Permite entrada no endpoint
  next();
};
