import { Assert } from '@assert';
import { UserModel } from '@models/user';
import { hashPassword } from '@utils/encryption';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@utils/regexes';
import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';

export const registerHandler = async (req: Request, res: Response) => {
  // validate all required args exist
  if (!new Assert(res, req.body?.email, 'email').exists().string().minLength(6).maxLength(256).isOk) return;
  if (!new Assert(res, req.body?.username, 'username').exists().string().minLength(1).maxLength(48).isOk) return;
  if (!new Assert(res, req.body?.password, 'password').exists().string().minLength(6).isOk) return;

  const { email, username, password } = req.body;

  // validate email
  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ success: false, error: 'BAD_EMAIL', field: 'email' });
    return;
  }
  // validate username
  if (!USERNAME_REGEX.test(username)) {
    res.status(400).json({ success: false, error: 'BAD_USERNAME', field: 'username' });
    return;
  }
  // validate password
  if (!PASSWORD_REGEX.test(password)) {
    res.status(400).json({ success: false, error: 'BAD_PASSWORD', field: 'password' });
    return;
  }

  const hashedPassword = hashPassword(password);

  let insertData: ResultSetHeader;
  try {
    insertData = await UserModel.createNewUser(email, username, hashedPassword);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, error: 'EMAIL_EXISTS', field: 'email' });
      return;
    }
    throw error;
  }
  const insertId = insertData.insertId;

  const loginError = await new Promise(resolve => {
    req.login(insertId, resolve);
  });
  if (loginError) {
    throw loginError;
  }

  res.status(201).json({ success: true, user: { email, username } });
};
