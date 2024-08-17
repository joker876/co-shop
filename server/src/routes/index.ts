
import { Router } from 'express';
import { authRouter } from './auth';
import { explorerDataRouter } from './explorer-data';

const router = Router();

router.use('/auth/', authRouter);
router.use('/explorer-data/', explorerDataRouter);

export const apiRouter = router;
