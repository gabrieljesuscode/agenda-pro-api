import { type RequestHandler } from 'express';
// import { validation } from '../../../shared/middlewares/validation';
// import * as z from 'zod';
import { DashboardService } from '../../../shared/services';

// const querySchema = z.object({
//   page: z.number().gt(0).optional(),
//   limit: z.number().gt(0).optional(),
//   filter: z.string().optional()
// });

// export const getSummaryValidation = validation({
//   query: querySchema
// });

export const getSummary: RequestHandler = async (_, res) => {

  const summary = await DashboardService.getSummary(res.locals.userId);

  return res.status(200).json(summary);
};  
