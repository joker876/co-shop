
import { myselfHandler } from '@handlers/user/myself';
import { Router } from 'express';

const router = Router();

router.get('/myself', myselfHandler);

export const userRouter = router;
