import { registerHandler } from '@handlers/auth/register';
import { Router } from 'express';

const router = Router();

router.post('/register', registerHandler);

export const authRouter = router;
