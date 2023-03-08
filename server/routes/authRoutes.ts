import express from 'express';

import { getUserToken } from '@controllers/discordAuth';

const authRouter = express.Router();

authRouter.route('/d/userToken').get(getUserToken);

export default authRouter;
