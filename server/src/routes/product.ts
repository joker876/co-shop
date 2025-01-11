import { setCheckedHandler } from '@handlers/product/set-checked';
import { Router } from 'express';

const router = Router();

router.post('/set-checked', setCheckedHandler);

export const productRouter = router;
