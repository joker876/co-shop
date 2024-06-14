import { loginHandler } from '@handlers/auth/login';
import { logoutHandler } from '@handlers/auth/logout';
import { registerHandler } from '@handlers/auth/register';
import { authenticationMiddleware } from '@utils/auth';
import { Router } from 'express';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', authenticationMiddleware(), logoutHandler);

export const authRouter = router;
