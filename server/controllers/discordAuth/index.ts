import * as z from 'zod';

import { CustomError } from '@middleware/error-handler';

import type { Request, Response } from 'express';

export const getUserToken = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    code: z.string().min(20).max(40),
  });
  const reqBody = bodySchema.parse(req.body);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID ?? '',
      client_secret: process.env.CLIENT_SECRET ?? '',
      grant_type: 'authorization_code',
      // TODO REDIRECT_URI = dev=5173 ; prod=4000
      redirect_uri: process.env.REDIRECT_URI ?? '',
      code: reqBody.code,
    }),
  };
  const request = await fetch('https://discord.com/api/oauth2/token', options);
  if (request.status !== 200) throw new CustomError(401);
  const data = await request.json();

  const identifyReq = await fetch('https://discordapp.com/api/users/@me', {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { authorization: `Bearer ${data['access_token']}` },
    method: 'GET',
    body: null,
  });
  if (identifyReq.status !== 200) throw new CustomError(401);
  const identifyData = await identifyReq.json();

  res.ok({ auth: data, user: identifyData });
};

export const refreshUserToken = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    refresh_token: z.string().min(20).max(40),
  });
  const reqBody = bodySchema.parse(req.body);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID ?? '',
      client_secret: process.env.CLIENT_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: reqBody.refresh_token,
    }),
  };
  const request = await fetch('https://discord.com/api/oauth2/token', options);
  if (request.status !== 200) throw new CustomError(401);
  const data = await request.json();

  res.ok(data);
};
