
import { listHandler } from '@handlers/list/list';
import { Router } from 'express';

const router = Router();

router.get('/:listId', listHandler);

export const listRouter = router;
