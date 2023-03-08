import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import logger from './utils/logger';
import {
  disconnectFromDatabase,
  connectToDatabase,
} from './utils/database';
import userRoute from './modules/user/user.route';
import { CORS_ORIGIN } from './constants';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use('/api/users', userRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();

  logger.info(`Server listening on port ${PORT}`);
});

const signals = ['SIGINT', 'SIGTERM'];

signals.forEach(signal => {
  process.on(signal, async () => {
    logger.info(`Closing server... ${signal}`);

    server.close();

    await disconnectFromDatabase();

    server.close(() => {
      logger.info(`Server closed on port ${PORT}`);
      process.exit(0);
    });
  });
});
