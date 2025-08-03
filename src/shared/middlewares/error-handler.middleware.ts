import { NextFunction, Request, Response } from "express";
import { AppException } from "../exceptions/app.exceptions";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: (err as any).details,
    });
  }

  console.log("***** ERROR *****");
  console.log(err);
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
