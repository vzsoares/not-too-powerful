import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({ success: event }),
  };
}
