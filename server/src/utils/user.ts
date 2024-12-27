import { Request } from "express";


export function getAuthUserId(req: Request<any, any, any, any, any>): number {
  return req.user as number;
}