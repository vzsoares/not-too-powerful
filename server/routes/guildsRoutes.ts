import express from 'express';

import {
  getBotMatches,
  getGuildsChannels,
  getUserGuilds,
  postImage,
} from '@controllers/guildsController';

const guildsRouter = express.Router();

guildsRouter.route('/user').get(getUserGuilds);
guildsRouter.route('/matches').get(getBotMatches);
guildsRouter.route('/channels').get(getGuildsChannels);
guildsRouter.route('/sendMessage').post(postImage);

export default guildsRouter;
