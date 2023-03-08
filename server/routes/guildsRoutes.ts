import express from 'express';

import { getUserGuilds } from '@controllers/guildsController';

const guildsRouter = express.Router();

guildsRouter.route('/user').get(getUserGuilds);

export default guildsRouter;
