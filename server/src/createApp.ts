import { authRouter } from '@routes/auth';
import express from 'express';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/api/auth', authRouter);

  return app;
}
