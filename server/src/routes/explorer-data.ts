import { folderContentsHandler } from '@handlers/explorer-data/folder-contents';
import { Router } from 'express';

const router = Router();

router.get('/folder-contents', folderContentsHandler);

export const explorerDataRouter = router;
