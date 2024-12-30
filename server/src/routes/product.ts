import { setCheckedHandler } from '@handlers/product/set-checked';
import { Router } from 'express';

const router = Router();

router.get('/set-checked', setCheckedHandler);

export const productRouter = router;
