import getToken from './actions/getToken';

import type {
  APIGatewayProxyEventEnhanced,
  APIGatewayProxyResult,
} from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEventEnhanced,
  fn: (event: APIGatewayProxyEventEnhanced) => Promise<APIGatewayProxyResult>,
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

export const getTokenHandler = (e: APIGatewayProxyEventEnhanced) =>
  handler(e, getToken);
