import * as z from 'zod';

import { CustomError } from '@middleware/error-handler';

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
