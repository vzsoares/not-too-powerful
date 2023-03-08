import express from 'express';

import { getUserToken, refreshUserToken } from '@controllers/discordAuth';

const authRouter = express.Router();

authRouter.route('/d/userToken').post(getUserToken);
authRouter.route('/d/refreshToken').post(refreshUserToken);

export default authRouter;
