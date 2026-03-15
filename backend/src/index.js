import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDatabase } from './config/database.js';
import { configureCloudinary } from './config/cloudinary.js';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'pixokin-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);

const start = async () => {
  await connectDatabase(env.mongoUri);
  configureCloudinary(env.cloudinary);
  app.listen(env.port, () => {
    console.log(`PIXOKIN API running on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
