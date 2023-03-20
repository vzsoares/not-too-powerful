import * as z from 'zod';
import FormData from 'form-data';
import axios from 'axios';

import { CustomError } from '@middleware/error-handler';

import { ProcessImage } from '@utils/processImage';

import type { UploadedFile } from 'express-fileupload';
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

export const postImage = async (req: Request, res: Response) => {
  const userIdSchema = z
    .string({ required_error: "'userId' is required" })
    .min(5);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files['attachments'] as UploadedFile;
  const form = new FormData();

  const message = req.body?.content as string | undefined;
  const userId = userIdSchema.parse(req.body?.userId);

  const processedFile = await ProcessImage(file['data']);

  form.append('content', `<@${userId}>${message ? '\n' + message : ''}`);

  form.append('attachments', processedFile, {
    filename: `${file['name'].split('.')[0]}.webp`,
  });

  const response = await axios.post(
    'https://discordapp.com/api/channels/1067968693017002047/messages',
    form,
    {
      headers: {
        ...form.getHeaders(),
        authorization: `Bot ${process.env.CLIENT_TOKEN ?? ''}`,
      },
    },
  );

  if (response.status !== 200) throw new CustomError(401);

  res.ok(response.data);
};

// https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api
// compressor js
