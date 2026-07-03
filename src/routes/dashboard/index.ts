import { Router } from 'express';
import { auth } from '../../shared/middlewares/auth';
import { DashboardController } from '../../controllers';

const DashboardRouter = Router();

DashboardRouter.use('/dashboard', auth);

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Resumo do dashboard
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo do dashboard retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClients:
 *                   type: number
 *                   example: 12
 *                 totalAppointments:
 *                   type: number
 *                   example: 31
 *                 appointmentsToday:
 *                   type: number
 *                   example: 4
 *                 appointmentsThisMonth:
 *                   type: number
 *                   example: 18
 *       401:
 *         description: Token inválido ou não informado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
DashboardRouter.get('/dashboard', DashboardController.getSummary);

/**
 * @swagger
 * /dashboard/upcoming:
 *   get:
 *     summary: Próximos agendamentos
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos próximos agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Consulta com cliente
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-07-03T14:00:00Z
 *                   client:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                       name:
 *                         type: string
 *                         example: João
 *       401:
 *         description: Token inválido ou não informado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
DashboardRouter.get('/dashboard/upcoming', DashboardController.upcoming);

export { DashboardRouter };
