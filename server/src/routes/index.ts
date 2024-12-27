
import { authenticationMiddleware } from '@utils/auth';
import { Router } from 'express';
import { authRouter } from './auth';
import { explorerDataRouter } from './explorer-data';

const router = Router();

router.use('/auth/', authRouter);
router.use('/explorer-data/', authenticationMiddleware(), explorerDataRouter);

export const apiRouter = router;
