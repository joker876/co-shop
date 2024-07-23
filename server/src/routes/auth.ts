import { loginHandler } from '@handlers/auth/login';
import { logoutHandler } from '@handlers/auth/logout';
import { registerStep1Handler, registerStep2Handler } from '@handlers/auth/register';
import { authenticationMiddleware } from '@utils/auth';
import { Router } from 'express';

const router = Router();

router.post('/register/step1', registerStep1Handler);
router.post('/register/step2', authenticationMiddleware(), registerStep2Handler);
router.post('/login', loginHandler);
router.post('/logout', authenticationMiddleware(), logoutHandler);

export const authRouter = router;
