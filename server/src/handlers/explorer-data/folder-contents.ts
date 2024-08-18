import { Assert } from '@assert';
import { FolderModel } from '@models/folder';
import { FolderContentsRequestParams, FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { Folder } from '@shared/interfaces/folder/folder';
import { RequestHandler } from 'express';

export const folderContentsHandler: RequestHandler<
  null,
  FolderContentsResponse,
  null,
  FolderContentsRequestParams
> = async (req, res) => {
  // validate all required args exist
  const { parentFolderId } = req.query;

  if (
    parentFolderId != undefined &&
    new Assert(res, req.query, 'parentFolderId').isStringNumber().isInteger().isMoreThan(0).isFailed
  )
    return;

  const userId = req.user as number;

  console.log(userId);

  const folders = (await FolderModel.getFoldersByParent(userId, parentFolderId)).map<Folder>(f => ({
    name: f.name,
    ownerId: f.owner,
    parentFolderId: f.parent_folder,
  }));

  res.status(200).send({ success: true, folders, lists: [] as any[] });
};
