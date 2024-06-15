import { NextFunction, Request, Response } from "express";

export function authenticationMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ success: false, error: 'NOT_LOGGED_IN' });
  };
}