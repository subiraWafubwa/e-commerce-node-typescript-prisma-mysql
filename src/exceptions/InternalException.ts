import { ErrorCode, HttpException } from "./HttpException";

export class InternalException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: any) {
    super(message, errorCode, 500, errors);
  }
}
