import * as z from 'zod';

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventEnhanced,
  APIGatewayProxyResult,
} from 'aws-lambda';

// @ts-ignore
import helpers from 'helpers';

import parser from 'lambda-multipart-parser';
import { ProcessImage } from '../utils/processImage';

export default async function handler(
  event: APIGatewayProxyEventEnhanced,
): Promise<APIGatewayProxyResult> {
  const userIdSchema = z
    .string({ required_error: "'userId' is required" })
    .min(5);
  const idSchema = z
    .string({ required_error: "'channelId' is required" })
    .min(5);

  const result = await parser.parse(event as unknown as APIGatewayProxyEvent);
  const file = result.files[0];

  if (!file || !file.content || !file.filename) {
    return helpers.response(401, 'No files were uploaded.');
  }

  const form = new FormData();

  const message = result.content as string | undefined;
  const userId = userIdSchema.parse(result.userId);
  const channelId = idSchema.parse(result.channelId);

  const processedFile = await ProcessImage(file.content);

  form.append('content', `<@${userId}>${message ? '\n' + message : ''}`);

  const toSendBlob = new Blob([processedFile]);

  form.append('attachments', toSendBlob, `${file.filename.split('.')[0]}.webp`);

  const response = await fetch(
    `https://discordapp.com/api/channels/${channelId}/messages`,
    {
      method: 'POST',
      body: form,
      headers: { authorization: `Bot ${process.env.CLIENT_TOKEN ?? ''}` },
    },
  );

  if (response.status !== 200) return helpers.response(401);

  const data = await response.json();
  return helpers.response(200, data);
}
// TODO separate into other lambda
