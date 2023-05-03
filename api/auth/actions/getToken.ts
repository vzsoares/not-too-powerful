import * as z from 'zod';

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  const bodySchema = z.object({
    code: z.string().min(20).max(40),
  });

  //@ts-expect-error Bala
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((event.requestContext.http?.method as string) !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify({}),
    };
  }

  const reqBody = bodySchema.parse(JSON.parse(event.body ?? ''));

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
  if (request.status !== 200) {
    return {
      statusCode: 401,
      body: JSON.stringify({ request }),
    };
  }
  const data = (await request.json()) as Record<string, string>;

  const identifyReq = await fetch('https://discordapp.com/api/users/@me', {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { authorization: `Bearer ${data.access_token}` },
    method: 'GET',
    body: null,
  });
  if (identifyReq.status !== 200) {
    return {
      statusCode: 401,
      body: JSON.stringify({ identifyReq }),
    };
  }
  const identifyData = (await identifyReq.json()) as Record<string, string>;

  return {
    statusCode: 200,
    body: JSON.stringify({ auth: data, user: identifyData }),
  };
}
