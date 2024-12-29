
import { authenticationMiddleware } from '@utils/auth';
import { Router } from 'express';
import { authRouter } from './auth';
import { explorerDataRouter } from './explorer-data';
import { listRouter } from './list';
import { userRouter } from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/explorer-data', authenticationMiddleware(), explorerDataRouter);
router.use('/user', authenticationMiddleware(), userRouter);
router.use('/list', authenticationMiddleware(), listRouter);

export const apiRouter = router;
