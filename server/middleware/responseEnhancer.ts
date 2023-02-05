import { message as STATUS_CODES } from 'statuses';
import _ from 'lodash';

import type { NextFunction, Request, Response } from 'express';

function responseEnhancer(req: Request, res: Response, next: NextFunction) {
  const codesNames = Object.values(STATUS_CODES).map((c) => _.camelCase(c));
  const codes = Object.keys(STATUS_CODES).map((c) => _.camelCase(c));
  // console.log(codes);
  codes;
  codesNames;
  next();
}

export default responseEnhancer;
