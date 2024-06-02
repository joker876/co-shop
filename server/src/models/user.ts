// import sql from '../db/db.js';

export class UserModel {
  static async doesUsernameExist(username: string) {
    const res = await sql`SELECT "username" FROM "users" WHERE "username" = ${username} LIMIT 1;`;
    return res.length > 0;
  }

  static async findByUsername(username: string) {
    const res = await sql`SELECT * FROM users WHERE "username" = ${username} LIMIT 1;`;
    return res[0];
  }

  static async findById(id: string) {
    const res = await sql`SELECT * FROM users WHERE "id" = ${id} LIMIT 1;`;
    return res[0];
  }

  static async createNewUser(username: string, hashedPassword: string) {
    return await sql`INSERT INTO users ("username", "password") VALUES (${username}, ${hashedPassword});`;
  }

  static async changePassword(username: string, hashedPassword: string) {
    const res = await sql`UPDATE users SET password = ${hashedPassword} WHERE username = ${username};`;
    return res;
  }
}
