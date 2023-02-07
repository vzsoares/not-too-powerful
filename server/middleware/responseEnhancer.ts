import _ from 'lodash';

import STATUS_CODES from '../types/express/responses.json';

import type { NextFunction, Request, Response } from 'express';

function responseEnhancer(req: Request, res: Response, next: NextFunction) {
  const statusNames = Object.keys(STATUS_CODES).map((c) => c);
  const statusMessages = Object.keys(STATUS_CODES).map((c) => _.startCase(c));
  const statusCodes = Object.keys(STATUS_CODES).map((c) => STATUS_CODES[c]);
  const statuses = statusNames.map((_, i) => ({
    name: statusNames[i],
    message: statusMessages[i],
    code: statusCodes[i],
  }));
  console.log(statuses);
  // TODO create responder function *(map statuses)
  statusMessages;
  statusNames;
  next();
}

export default responseEnhancer;
