import { loginHandler } from '@handlers/auth/login';
import { registerHandler } from '@handlers/auth/register';
import { Router } from 'express';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export const authRouter = router;
