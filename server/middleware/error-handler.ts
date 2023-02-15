import logger from './logger';

import type { NextFunction, Request, Response } from 'express';

export class CustomError extends Error {
  status: number;
  message: string;
  error: unknown[];
  code?: string;
  static baseMsg = 'Something wrong happened ):';
  constructor(
    status = 500,
    message = 'Something wrong happened ):',
    error = [],
    code = undefined,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
    this.code = code;
  }
}

function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const toSendMsg =
    err.status !== 500 && err.message === CustomError.baseMsg
      ? null
      : err.message;

  const toSendStatus = err.status ?? 500;

  if (toSendStatus === 500) {
    logger.error(`${err.message ?? ''} ${err?.stack ?? ''}`);
  }

  res[toSendStatus](null, toSendMsg, err.code, err.error);
}

export default errorHandler;
