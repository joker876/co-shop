import { NextFunction, Request, Response } from 'express';
import { EnvironmentType } from 'src/dotenv-type';

declare global {
  namespace Express {
    interface Request {
      isLocalhost?: boolean;
    }
  }
}

export const isLocalhostMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (process.env.ENVIRONMENT !== EnvironmentType.Local) {
    next();
    return;
  }
  const isLocalhost = req.ip === '127.0.0.1' || req.ip === '::1';
  req.isLocalhost = isLocalhost;
  next();
};
