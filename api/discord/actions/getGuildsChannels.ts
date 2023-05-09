import * as z from 'zod';

import type {
  APIGatewayProxyEventEnhanced,
  APIGatewayProxyResult,
} from 'aws-lambda';

// @ts-ignore
import helpers from 'helpers';

export default async function handler(
  event: APIGatewayProxyEventEnhanced,
): Promise<APIGatewayProxyResult> {
  const idSchema = z.string().min(4).max(40);

  const id = idSchema.parse(event.queryStringParameters?.guild_id);

  const options = {
    method: 'GET',
    headers: { authorization: `Bot ${process.env.CLIENT_TOKEN ?? ''}` },
  };
  const request = await fetch(
    `https://discordapp.com/api/guilds/${id}/channels`,
    options,
  );

  if (request.status !== 200) return helpers.response(401);
  const data = await request.json();

  return helpers.response(200, data);
}
