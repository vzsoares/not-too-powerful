import { CustomError } from '@middleware/error-handler';
import { Request, Response } from 'express';
import * as z from 'zod';

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
      redirect_uri: 'http://localhost:5173/',
      code: reqBody.code,
    }),
  };
  const request = await fetch('https://discord.com/api/oauth2/token', options);
  if (request.status !== 200) throw new CustomError(401);
  const data = await request.json();
  res.ok({ data: data.data });
};
