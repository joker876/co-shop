import { Assert } from '@assert';
import { FolderModel } from '@models/folder';
import { FolderContentsRequest, FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { Folder } from '@shared/interfaces/folder/folder';
import { RequestHandler } from 'express';

export const folderContentsHandler: RequestHandler<null, FolderContentsResponse, FolderContentsRequest> = async (
  req,
  res
) => {
  // validate all required args exist
  const { parentFolderId } = req.body;

  if (
    parentFolderId != undefined &&
    new Assert(res, req.body, 'parentFolderId').isNumber().isInteger().isMoreThan(0).isFailed
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
