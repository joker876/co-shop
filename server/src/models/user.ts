import { RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';

export class UserModel {
  static async doesUsernameExist(username: string) {
    const res = await queryDb<RowDataPacket[]>('SELECT "username" FROM "users" WHERE "username" = ? LIMIT 1;', [
      username,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result.length > 0;
  }

  static async findByUsername(username: string) {
    const res = await queryDb<RowDataPacket[]>('SELECT "username" FROM "users" WHERE "username" = ? LIMIT 1;', [
      username,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0];
  }

  static async findById(id: string) {
    const res = await queryDb<RowDataPacket[]>('SELECT "username" FROM "users" WHERE "id" = ? LIMIT 1;', [id]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0];
  }

  static async createNewUser(username: string, hashedPassword: string) {
    const res = await queryDb('INSERT INTO users ("username", "password") VALUES (?, ?);', [username, hashedPassword]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }

  static async changePassword(username: string, hashedPassword: string) {
    const res = await queryDb('UPDATE users SET password = ? WHERE username = ?;', [hashedPassword, username]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
}
