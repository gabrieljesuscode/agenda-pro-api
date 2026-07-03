import { Router } from 'express';
import { ClientsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const ClientsRouter = Router();

ClientsRouter.use('/clients', auth);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Criar cliente
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Zora
 *               email:
 *                 type: string
 *                 example: zora@email.com
 *               phone:
 *                 type: string
 *                 example: 601-464-5299
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Zora
 *                 email:
 *                   type: string
 *                   example: zora@email.com
 *                 phone:
 *                   type: string
 *                   example: 601-464-5299
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
ClientsRouter.post('/clients', ClientsController.createValidation, ClientsController.create);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar clientes
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
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
 *                   name:
 *                     type: string
 *                     example: Zora
 *                   email:
 *                     type: string
 *                     example: zora@email.com
 *                   phone:
 *                     type: string
 *                     example: 601-464-5299
 *                   userId:
 *                     type: string
 *                     example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
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
ClientsRouter.get('/clients', ClientsController.listValidation, ClientsController.list);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Obter cliente por ID
 *     tags:
 *       - Clients
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
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Zora
 *                 email:
 *                   type: string
 *                   example: zora@email.com
 *                 phone:
 *                   type: string
 *                   example: 601-464-5299
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
ClientsRouter.get('/clients/:id', ClientsController.getByIdValidation, ClientsController.getById);

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Atualizar cliente
 *     tags:
 *       - Clients
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
 *               name:
 *                 type: string
 *                 example: Zora
 *               email:
 *                 type: string
 *                 example: zora@email.com
 *               phone:
 *                 type: string
 *                 example: 601-464-5299
 *     responses:
 *       201:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Zora
 *                 email:
 *                   type: string
 *                   example: zora@email.com
 *                 phone:
 *                   type: string
 *                   example: 601-464-5299
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
ClientsRouter.patch('/clients/:id', ClientsController.updateValidation, ClientsController.update);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Excluir cliente
 *     tags:
 *       - Clients
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
 *         description: Cliente excluído com sucesso
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
ClientsRouter.delete('/clients/:id', ClientsController.deleteByIdValidation, ClientsController.deleteById);

export { ClientsRouter };
