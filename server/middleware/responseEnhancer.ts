import _ from 'lodash';

import STATUS_CODES from '../types/express/responses.json';

import type { NextFunction, Request, Response } from 'express';

interface bodyT {
  data: unknown | null;
  message: unknown | null;
  error: unknown | null;
  code: unknown | null;
}

function responseEnhancer(req: Request, res: Response, next: NextFunction) {
  const statuses = Object.entries(STATUS_CODES).map(([el, vl]) => ({
    name: el,
    message: _.startCase(el),
    status: Number(vl),
  }));

  statuses.forEach(({ name, message: httpMsg, status }) => {
    res[name] = mapHttpResponses(res, httpMsg, status);
    res[status] = mapHttpResponses(res, httpMsg, status);
  });

  next();
}

export default responseEnhancer;

function prepareBody(
  data: bodyT['data'] = null,
  message: bodyT['message'] = null,
  code: bodyT['code'] = null,
  error: bodyT['error'] = null,
): bodyT {
  return {
    data,
    message,
    code,
    error,
  };
}

function mapHttpResponses(res: Response, httpMsg: string, status: number) {
  return function (
    data: bodyT['data'] = null,
    message: bodyT['message'] = httpMsg,
    code: bodyT['code'] = status,
    error: bodyT['error'],
  ) {
    res.status(status);

    const dataIsValidObject = typeof data === 'object' && data !== null;

    const toSendMsg = dataIsValidObject
      ? data['msg'] || data['message']
      : message || httpMsg;
    const toSendCode = dataIsValidObject ? data['code'] : code || status;
    const toSendError = dataIsValidObject
      ? data['err'] || data['error']
      : error;

    if ([204, 304].includes(status)) {
      res.json();
    } else res.json(prepareBody(data, toSendMsg, toSendCode, toSendError));
  };
}
