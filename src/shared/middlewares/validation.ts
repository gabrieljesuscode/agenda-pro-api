import { type RequestHandler } from 'express';
import * as z from 'zod';
import { pt } from 'zod/locales';

z.config(pt());

type TProperty = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, z.ZodObject>;

type TValidation = (allSchemas: Partial<TAllSchemas>) => RequestHandler;


export const validation: TValidation = (allSchemas) => (req, res, next) => {

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(allSchemas).forEach(([key, schema]) => {
    try {
      // Verifica se o body tem os dados com zod
      schema.parse(req[key as TProperty]);

    } catch (error) {
      // Trata qualquer excessão e mostra de forma simples para o usuário

      // Se não for um ZodError trata de outra forma
      if (!(error instanceof z.ZodError)) return res.status(400).json({ error: 'Erro Interno' });

      // Objeto Errors para guardar os campos e suas mensagens
      const errors: Record<string, string> = {};

      // Adiciona erros ao array final
      error.issues.forEach((issue) => {
        if (!issue.path[0]) return;
        errors[issue.path[0] as string] = issue.message;
      });

      // Mostra os erros para o usuário
      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) return next();

  return res.status(400).json({ errors: errorsResult });
};
