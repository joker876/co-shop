
import { authenticationMiddleware } from '@utils/auth';
import { Router } from 'express';
import { authRouter } from './auth';
import { explorerDataRouter } from './explorer-data';
import { userRouter } from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/explorer-data', authenticationMiddleware(), explorerDataRouter);
router.use('/user', authenticationMiddleware(), userRouter);

export const apiRouter = router;
