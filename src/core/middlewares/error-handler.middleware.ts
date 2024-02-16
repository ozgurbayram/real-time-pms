import { NextFunction, Request, Response } from "express";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Record<string, any>, req: Request, res: Response, next: NextFunction): void {
    const status = error?.httpCode || 500;
    const message = error.message || "Internal Server Error";
    const errors = error.errors || null;

    res.status(status).json({
      status,
      message,
      errors,
    });
  }
}
