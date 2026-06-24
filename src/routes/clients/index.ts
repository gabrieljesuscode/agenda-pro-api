import { Router } from 'express';
import { ClientsController } from '../../controllers';
import { auth } from '../../shared/middlewares/auth';

const ClientsRouter = Router();

ClientsRouter.use('/clients', auth);

// Clients CRUD
ClientsRouter.post('/clients', ClientsController.createValidation, ClientsController.create);
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar Usuários
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 * 
 * 
 *     responses:
 *       200:
 *         description: Lista de Clientes
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
 *
 *                   email:
 *                     type: string
 *                     example: zora@email.com
 *
 *                   phone:
 *                     type: string
 *                     example: 601-464-5299
 *
 *                   userId:
 *                     type: string
 *                     example: 6ff1691f-21af-4694-8b05-969242a2ce37
 *
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *
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
 *                   example: Email ou senha inválidos
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
 * 
 */
ClientsRouter.get('/clients', ClientsController.listValidation, ClientsController.list);
ClientsRouter.get('/clients/:id', ClientsController.getByIdValidation, ClientsController.getById);
ClientsRouter.patch('/clients/:id', ClientsController.updateValidation, ClientsController.update);
ClientsRouter.delete('/clients/:id', ClientsController.deleteByIdValidation, ClientsController.deleteById);

export { ClientsRouter };
