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
  const bodySchema = z.object({
    code: z.string().min(20).max(40),
  });

  const reqBody = bodySchema.parse(JSON.parse(event?.body ?? '""'));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID ?? '',
      client_secret: process.env.CLIENT_SECRET ?? '',
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI ?? '',
      code: reqBody.code,
    }),
  };
  const request = await fetch('https://discord.com/api/oauth2/token', options);
  const data = (await request.json()) as Record<string, string>;
  if (request.status !== 200) {
    return helpers.response(401, { data: data });
  }

  const identifyReq = await fetch('https://discordapp.com/api/users/@me', {
    headers: { authorization: `Bearer ${data.access_token}` },
    method: 'GET',
    body: null,
  });
  const identifyData = (await identifyReq.json()) as Record<string, string>;
  if (identifyReq.status !== 200) {
    return helpers.response(401, { data: identifyData });
  }

  return helpers.response(200, { auth: data, user: identifyData });
}
