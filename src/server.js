import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import router from './routers/index.js';
import { requestIdMiddleware } from './middlewares/requestId.js';
import { notFoundMiddleware } from './middlewares/notFoundHandler.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

export const startServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use([requestIdMiddleware, pino(), cors()]);

  app.use(cookieParser());

  app.use(router);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT} port!`);
  });
};
