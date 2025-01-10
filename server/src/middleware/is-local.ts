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
  const { ip } = req;
  if (process.env.ENVIRONMENT !== EnvironmentType.Local || !ip) {
    next();
    return;
  }
  const isLocalhost =
    ip === '127.0.0.1' || ip === '::1' || ip === process.env.IPV4 || /^192\.168\.0\.\d{1,3}$/.test(ip);
  req.isLocalhost = isLocalhost;
  next();
};
