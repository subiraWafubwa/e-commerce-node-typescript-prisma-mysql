import { ErrorCode, HttpException } from "./HttpException";

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCode) {
    super(message, errorCode, 422, errors);
  }
}
