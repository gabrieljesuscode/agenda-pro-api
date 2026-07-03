import { Router } from 'express';
import { AppointmentsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const AppointmentsRouter = Router();

AppointmentsRouter.use('/appointments', auth);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Criar agendamento
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - clientId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Consulta com cliente
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-03T14:00:00Z
 *               clientId:
 *                 type: string
 *                 example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Consulta com cliente
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-07-03T14:00:00Z
 *                 clientId:
 *                   type: string
 *                   example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                 userId:
 *                   type: string
 *                   example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
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
AppointmentsRouter.post('/appointments', AppointmentsController.createValidation, AppointmentsController.create);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Listar agendamentos
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
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
 *                   clientId:
 *                     type: string
 *                     example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                   userId:
 *                     type: string
 *                     example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
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
AppointmentsRouter.get('/appointments', AppointmentsController.listValidation, AppointmentsController.list);

/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Atualizar agendamento
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nova consulta
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-03T15:00:00Z
 *               clientId:
 *                 type: string
 *                 example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *     responses:
 *       201:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Nova consulta
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-07-03T15:00:00Z
 *                 clientId:
 *                   type: string
 *                   example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                 userId:
 *                   type: string
 *                   example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: ID inválido ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: invalid id
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
AppointmentsRouter.patch('/appointments/:id', AppointmentsController.updateValidation, AppointmentsController.update);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Excluir agendamento
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       204:
 *         description: Agendamento excluído com sucesso
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: invalid id
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
AppointmentsRouter.delete('/appointments/:id', AppointmentsController.deleteByIdValidation, AppointmentsController.deleteById);

export { AppointmentsRouter };
