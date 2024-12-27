import { RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';
import { ListRecord } from 'src/interfaces/list';

export class ListModel {
  static async getListsByParent(userId: number, parentId?: number | null): Promise<ListRecord[]> {
    const res = parentId
      ? await queryDb<RowDataPacket[]>('SELECT * FROM lists WHERE owner = ? AND parent_folder = ?;', [
          userId,
          parentId,
        ])
      : await queryDb<RowDataPacket[]>('SELECT * FROM lists WHERE owner = ? AND parent_folder IS NULL;', [
          userId,
          parentId,
        ]);
    if (res.err) {
      throw res.err;
    }
    return res.result as ListRecord[];
  }
}
