import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "../exceptions/HttpException";
import { InternalException } from "../exceptions/InternalException";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      next(
        error instanceof HttpException
          ? error
          : new InternalException(
              "Something went wrong!",
              ErrorCode.INTERNAL_EXCEPTION,
              error
            )
      );
    }
  };
};
