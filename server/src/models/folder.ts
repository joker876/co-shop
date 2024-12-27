import { RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';
import { FolderRecord } from 'src/interfaces/folder';

export class FolderModel {
  static async getFoldersByParent(userId: number, parentId?: number | null): Promise<FolderRecord[]> {
    const res = parentId
      ? await queryDb<RowDataPacket[]>('SELECT * FROM folders WHERE owner = ? AND parent_folder = ?;', [
          userId,
          parentId,
        ])
      : await queryDb<RowDataPacket[]>('SELECT * FROM folders WHERE owner = ? AND parent_folder IS NULL;', [
          userId,
          parentId,
        ]);
    if (res.err) {
      throw res.err;
    }
    return res.result as FolderRecord[];
  }
}
