import { List } from '@shared/interfaces/list/list';
import { RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';
import { Publicable } from 'src/interfaces/publicable';

export class ListRecord implements Publicable<List> {
  readonly id!: number;
  readonly name!: string;
  readonly shop!: string | null;
  readonly date!: Date | null;
  readonly owner!: number;
  readonly parent_folder!: number | null;

  constructor(data: RowDataPacket) {
    Object.assign(this, data);
  }

  toPublic(): List {
    return {
      id: this.id,
      name: this.name,
      shop: this.shop,
      date: this.date,
    };
  }
}

export class ListModel {
  static async findById(id: number, userId: number): Promise<ListRecord | null> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM lists WHERE id = ? AND owner = ? LIMIT 1;', [id, userId]);
    if (res.err) {
      throw res.err;
    }
    return res.result.length === 0 ? null : new ListRecord(res.result[0]);
  }

  static async getListsByParent(userId: number, parentId?: number | null): Promise<ListRecord[]> {
    const res = parentId
      ? await queryDb<RowDataPacket[]>('SELECT * FROM lists WHERE owner = ? AND parent_folder = ?;', [userId, parentId])
      : await queryDb<RowDataPacket[]>('SELECT * FROM lists WHERE owner = ? AND parent_folder IS NULL;', [
          userId,
          parentId,
        ]);
    if (res.err) {
      throw res.err;
    }
    return res.result.map(v => new ListRecord(v));
  }
}
