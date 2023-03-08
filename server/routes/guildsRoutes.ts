import express from 'express';

import { getBotMatches, getUserGuilds } from '@controllers/guildsController';

const guildsRouter = express.Router();

guildsRouter.route('/user').get(getUserGuilds);
guildsRouter.route('/matches').get(getBotMatches);

export default guildsRouter;
