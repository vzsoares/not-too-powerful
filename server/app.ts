import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import notFound from '@middleware/not-found';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
);
app.use(cookieParser(process.env.JWT_SECRET));

app.use((req, res, next) => {
  // TODO extend res
  // https://www.npmjs.com/package/express-respond
  res.currentUser = '';
  res.error = () => {
    res['code'] = 450;
    return () => {};
  };

  next();
});

app.get('/api/v1', (req, res) => {
  res.json({ status: 201 });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.use(notFound);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
