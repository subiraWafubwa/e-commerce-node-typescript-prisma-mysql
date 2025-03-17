import { ErrorCode, HttpException } from "./HttpException";

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: any) {
    super(message, errorCode, 422, errors);
  }
}
