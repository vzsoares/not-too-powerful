import getToken from './actions/getToken';

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const proxy = event.pathParameters?.proxy;

  switch (proxy) {
    case 'getToken':
      return await getToken(event);
    case 'refreshToken':
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({}),
      };
  }
};
