import { UserInfo } from '@shared/interfaces/user/user-info';
import { newExistsQuery } from '@utils/db-helpers';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';

export class UserRecord {
  readonly id!: number;
  readonly email!: string;
  readonly username!: string;
  readonly password!: string;
  readonly created_date!: Date;

  constructor(data: RowDataPacket) {
    Object.assign(this, data);
  }

  toPublic(): UserInfo {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      createdAt: this.created_date,
    };
  }
}

export class UserModel {
  static async doesEmailExist(email: string): Promise<boolean> {
    return newExistsQuery('users', 'email = ?', [email]);
  }

  static async findByEmail(email: string): Promise<UserRecord | undefined> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM users WHERE email = ? LIMIT 1;', [email]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0] && new UserRecord(res.result[0]);
  }

  static async findById(id: number): Promise<UserRecord | undefined> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM users WHERE id = ? LIMIT 1;', [id]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0] && new UserRecord(res.result[0]);
  }

  static async createNewUser(email: string, hashedPassword: string) {
    const res = await queryDb<ResultSetHeader>('INSERT INTO users (email, password) VALUES (?, ?);', [
      email,
      hashedPassword,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }

  static async checkUserHasNoUsername(userId: number, username: string) {
    console.log(userId, username);
    const res = await queryDb<ResultSetHeader>('UPDATE users SET username = ? WHERE id = ? AND NOT username;', [username, userId]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
  static async setBrandNewUserUsername(userId: number, username: string) {
    const res = await queryDb<ResultSetHeader>('UPDATE users SET username = ? WHERE id = ? AND username IS NULL;', [
      username,
      userId,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }

  static async changePassword(email: string, hashedPassword: string) {
    const res = await queryDb<ResultSetHeader>('UPDATE users SET password = ? WHERE email = ?;', [
      hashedPassword,
      email,
    ]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }

  static async updateLastLogin(id: number) {
    const res = await queryDb<ResultSetHeader>(
      `
        UPDATE users
        SET last_login = NOW()
        WHERE id = ?;
      `,
      [id]
    );
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
}
