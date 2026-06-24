import { Router } from 'express';
import { AuthController } from '../../controllers';

const AuthRouter = Router();

// Auth register && login
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: example name
 * 
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *  
 *               password:
 *                 type: string
 *                 example: 123456
 *       
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *   
 *                 name:
 *                   type: string
 *                   example: example name
 *    
 *                 email:
 *                   type: string
 *                   example: example@gmail.com
 *       
 *       400: 
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *       409: 
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email já cadastrado
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
AuthRouter.post('/auth/register', AuthController.registerValidation, AuthController.register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *  
 *               password:
 *                 type: string
 *                 example: 123456
 *       
 *     responses:
 *       200:
 *         description: Login realizado com sucesso 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIs...
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
 *         description: Email ou senha inválidos
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
AuthRouter.post('/auth/login', AuthController.loginValidation, AuthController.login);

export { AuthRouter };
