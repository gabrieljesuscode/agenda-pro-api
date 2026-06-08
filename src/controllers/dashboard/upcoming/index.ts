import { type RequestHandler } from 'express';
import { DashboardService } from '../../../shared/services';



export const upcoming: RequestHandler = async (_, res) => {

  const summary = await DashboardService.upcoming(res.locals.userId);

  return res.status(200).json(summary);
};  
