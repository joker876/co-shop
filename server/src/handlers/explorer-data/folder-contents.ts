import { Assert } from '@assert';
import { FolderModel } from '@models/folder';
import { ListModel } from '@models/list';
import { FolderContentsRequestParams, FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { getAuthUserId } from '@utils/user';
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
    parentFolderId !== undefined &&
    parentFolderId !== '' &&
    new Assert(res, req.query, 'parentFolderId').isStringNumber().isInteger().isMoreThan(0).isFailed
  ) {
    return;
  }

  const parentFolderIdNumber = parentFolderId === '' ? null : Number(parentFolderId);

  const userId = getAuthUserId(req);

  const folders = (await FolderModel.getFoldersByParent(userId, parentFolderIdNumber)).toPublic();
  const lists = (await ListModel.getListsByParent(userId, parentFolderIdNumber)).toPublic();

  res.status(200).send({ success: true, folders, lists });
};
