import mongoose from 'mongoose';
import logger from './logger';

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/yt-clone';

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Error connecting to database', error);
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from database');
  } catch (error) {
    logger.error('Error disconnecting from database', error);
    process.exit(1);
  }
}
