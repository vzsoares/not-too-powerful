import { getUserToken } from '@controllers/discordAuth';
import express from 'express';

const authRouter = express.Router();

authRouter.route('/userToken').get(getUserToken);

export default authRouter;
