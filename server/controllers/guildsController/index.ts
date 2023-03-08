import * as z from 'zod';

import { CustomError } from '@middleware/error-handler';

import type { anyJ } from 'types/types';
import type { Request, Response } from 'express';

export const getUserGuilds = async (req: Request, res: Response) => {
  const tokenSchema = z.string().min(20).max(40);

  const token = tokenSchema.parse(req.headers.authorization);

  const options = {
    method: 'GET',
    headers: { authorization: 'Bearer ' + token },
  };
  const request = await fetch(
    'https://discordapp.com/api/users/@me/guilds',
    options,
  );

  if (request.status !== 200) throw new CustomError(401);
  const data = await request.json();

  res.ok(data);
};

export const getBotMatches = async (req: Request, res: Response) => {
  const tokenSchema = z.string().min(20).max(40);

  const token = tokenSchema.parse(req.headers.authorization);

  async function getGuildsList(auth: string) {
    const options = {
      method: 'GET',
      headers: { authorization: auth },
    };
    const request = await fetch(
      'https://discordapp.com/api/users/@me/guilds',
      options,
    );

    if (request.status !== 200) throw new CustomError(401);
    const data = await request.json();
    return data;
  }

  const userGuilds = await getGuildsList('Bearer ' + token);
  const botGuilds = await getGuildsList(
    `Bot ${process.env.CLIENT_TOKEN ?? ''}`,
  );
  const match = botGuilds.filter((x: anyJ) =>
    userGuilds.find((z: anyJ) => z.id === x.id),
  );

  res.ok(match);
};

export const getGuildsChannels = async (req: Request, res: Response) => {
  const idSchema = z.string().min(4).max(40);

  const id = idSchema.parse(req.query.guild_id);

  const options = {
    method: 'GET',
    headers: { authorization: `Bot ${process.env.CLIENT_TOKEN ?? ''}` },
  };
  const request = await fetch(
    `https://discordapp.com/api/guilds/${id}/channels`,
    options,
  );

  if (request.status !== 200) throw new CustomError(401);
  const data = await request.json();

  res.ok(data);
};
