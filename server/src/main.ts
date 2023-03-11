import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import logger from './utils/logger';
import {
  disconnectFromDatabase,
  connectToDatabase,
} from './utils/database';
import { CORS_ORIGIN } from './constants';

import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/videos/video.route';
import deserializeUser from './middleware/deserializeUser';

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
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/videos', videoRoute);

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
