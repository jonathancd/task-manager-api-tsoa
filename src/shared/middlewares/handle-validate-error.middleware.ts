import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export const errorValidateHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidateError) {
    const normalizedErrors: Record<string, string[]> = {};

    for (const key in err.fields) {
      // eliminar "requestBody." u otro prefijo si existe
      const cleanKey = key.replace(/^requestBody\./, "");
      // pasar el mensaje a array
      const message = err.fields[key].message;
      normalizedErrors[cleanKey] = [message];
    }

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: normalizedErrors,
    });
  }

  next(err);
};
