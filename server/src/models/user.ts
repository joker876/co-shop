import { newExistsQuery } from '@utils/db-helpers';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';

export class UserModel {
  static async doesEmailExist(email: string): Promise<boolean> {
    return newExistsQuery('users', 'email = ?', [email]);
  }

  static async findByEmail(email: string): Promise<RowDataPacket> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM coshop.users WHERE email = ? LIMIT 1;', [
      email,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0];
  }

  static async findById(id: string): Promise<RowDataPacket> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM coshop.users WHERE id = ? LIMIT 1;', [id]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0];
  }

  static async createNewUser(email: string, username: string, hashedPassword: string) {
    const res = await queryDb<ResultSetHeader>('INSERT INTO coshop.users (email, username, password) VALUES (?, ?, ?);', [
      email,
      username,
      hashedPassword,
    ]);
    console.log(res);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }

  static async changePassword(email: string, hashedPassword: string) {
    const res = await queryDb<ResultSetHeader>('UPDATE coshop.users SET password = ? WHERE email = ?;', [
      hashedPassword,
      email,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
}
