import path from 'path';

import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import apiNotFound from '@middleware/not-found';
import responseEnhancer from '@middleware/responseEnhancer';
import errorHandler from '@middleware/error-handler';
import logger from '@middleware/logger';

import authRouter from '@routes/authRoutes';
import guildsRouter from '@routes/guildsRoutes';

import discordBot from './discordBot';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
);
app.use(cookieParser(process.env.JWT_SECRET));

app.use(responseEnhancer);

void discordBot();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/guilds', guildsRouter);

app.use(logger);

app.use(apiNotFound);
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
