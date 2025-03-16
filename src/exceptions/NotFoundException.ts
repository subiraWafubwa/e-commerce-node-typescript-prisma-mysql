import { ErrorCode, HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCode) {
    super(message, errorCode, 404, errors);
  }
}
