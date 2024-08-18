import { Assert } from '@assert';
import { FolderModel } from '@models/folder';
import { ListModel } from '@models/list';
import { FolderContentsRequestParams, FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { Folder } from '@shared/interfaces/folder/folder';
import { List } from '@shared/interfaces/list/list';
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
    parentFolderId != '' &&
    new Assert(res, req.query, 'parentFolderId').isStringNumber().isInteger().isMoreThan(0).isFailed
  )
    return;

  const parentFolderIdNumber = Number(parentFolderId);

  const userId = req.user as number;

  const folders = (await FolderModel.getFoldersByParent(userId, parentFolderIdNumber)).map<Folder>(f => ({
    name: f.name,
  }));
  const lists = (await ListModel.getListsByParent(userId, parentFolderIdNumber)).map<List>(l => ({
    name: l.name,
    shop: l.shop,
    date: l.date,
  }));

  res.status(200).send({ success: true, folders, lists });
};
