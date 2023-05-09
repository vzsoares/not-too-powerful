import getBotMatches from './actions/getBotMatches';
import getGuildsChannels from './actions/getGuildsChannels';

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

export const getBotMatchesHandler = (e: APIGatewayProxyEventEnhanced) =>
  handler(e, getBotMatches);

  export const getGuildsChannelsHandler = (e: APIGatewayProxyEventEnhanced) =>
  handler(e, getGuildsChannels);