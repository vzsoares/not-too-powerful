import getToken from './actions/getToken';

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface RequestContext {
  accountId: string;
  apiId: string;
  authorizer?: Record<string, unknown>;
  domainName: string;
  domainPrefix: string;
  http: {
    method: string;
    path: string;
    protocol: string;
    sourceIp: string;
    userAgent: string;
  };
  requestId: string;
  routeKey: string;
  stage: string;
  time: string;
  timeEpoch: number;
}
// TODO EXTEND APIGatewayProxyEvent type
export const handler = async (
  event: { requestContext: RequestContext } & APIGatewayProxyEvent,
  fn: (
    event: { requestContext: RequestContext } & APIGatewayProxyEvent,
  ) => Promise<APIGatewayProxyResult>,
) => {
  try {
    const result = await fn(event);
    return result;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

export const getTokenHandler = (
  e: { requestContext: RequestContext } & APIGatewayProxyEvent,
) => handler(e, getToken);
