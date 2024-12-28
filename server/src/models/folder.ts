import { Folder } from '@shared/interfaces/folder/folder';
import { RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';
import { Publicable } from 'src/interfaces/publicable';

export class FolderRecord implements Publicable<Folder> {
  readonly id!: number;
  readonly name!: string;
  readonly owner!: number;
  readonly parent_folder!: number | null;

  constructor(data: RowDataPacket) {
    Object.assign(this, data);
  }

  toPublic(): Folder {
    return {
      id: this.id,
      name: this.name,
      parentFolderId: this.parent_folder,
    };
  }
}

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
    return res.result.map(v => new FolderRecord(v));
  }
}
