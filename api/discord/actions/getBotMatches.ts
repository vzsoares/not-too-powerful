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
  const tokenSchema = z.string().min(20).max(40);

  const token = tokenSchema.parse(event?.headers?.['authorization'] ?? '');

  async function getGuildsList(auth: string) {
    const options = {
      method: 'GET',
      headers: { authorization: auth },
    };
    const request = await fetch(
      'https://discordapp.com/api/users/@me/guilds',
      options,
    );

    if (request.status !== 200) return helpers.response(401);
    const data = await request.json();
    return data;
  }

  const userGuilds = await getGuildsList('Bearer ' + token);
  const botGuilds = await getGuildsList(
    `Bot ${process.env.CLIENT_TOKEN ?? ''}`,
  );
  const match = botGuilds.filter((x: any) =>
    userGuilds.find((y: any) => y.id === x.id),
  );

  return helpers.response(200, match);
}
