import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { router } from './routes';
import { swaggerSpec } from './swagger/swagger';

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(router);


export default app;
