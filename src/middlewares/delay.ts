import { NextFunction, Request, Response } from "express";

export function delayMiddleware(ms: number) {
  return function (req:Request , res:Response, next: NextFunction) {
    setTimeout(() => {
      next();
    }, ms);
  };
}

