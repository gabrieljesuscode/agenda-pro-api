import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



export const auth: RequestHandler = async (req, res, next) => {

  const authorization = req.headers.authorization;

  if (!authorization) return res.status(400).json(
    {
      error: 'token não informado',
    }
  );

  const token = authorization.split(' ')[1];

  if (!token) return res.status(400).json(
    {
      error: 'token não informado',
    }
  );


  try {
    jwt.verify(token, process.env.JWT_SECRET || '');

  } catch {
    return res.status(401).json(
      {
        error: 'Token inválido'
      }
    );
  };

  next();
};
