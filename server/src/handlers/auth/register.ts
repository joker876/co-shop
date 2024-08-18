import { Assert } from '@assert';
import { UserModel } from '@models/user';
import {
  AuthRegisterStep1Request,
  AuthRegisterStep1Response,
  AuthRegisterStep2Request,
  AuthRegisterStep2Response,
} from '@shared/interfaces/auth/register';
import {
  MAX_EMAIL_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@utils/constants';
import { hashPassword } from '@utils/encryption';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@utils/regexes';
import { RequestHandler } from 'express';
import { ResultSetHeader } from 'mysql2';

export const registerStep1Handler: RequestHandler<null, AuthRegisterStep1Response, AuthRegisterStep1Request> = async (
  req,
  res
) => {
  // validate all required args exist
  if (
    new Assert(res, req.body, 'email').exists().isString().minLength(MIN_EMAIL_LENGTH).maxLength(MAX_EMAIL_LENGTH)
      .isFailed
  )
    return;
  if (new Assert(res, req.body, 'password').exists().isString().minLength(MIN_PASSWORD_LENGTH).isFailed) return;

  const { email, password } = req.body;

  // validate email
  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ success: false, error: 'BAD_EMAIL', field: 'email' });
    return;
  }
  // validate password
  if (!PASSWORD_REGEX.test(password)) {
    res.status(400).json({ success: false, error: 'BAD_PASSWORD', field: 'password' });
    return;
  }

  const hashedPassword = hashPassword(password);

  // save user or send error if it exists
  let insertData: ResultSetHeader;
  try {
    insertData = await UserModel.createNewUser(email, hashedPassword);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, error: 'EMAIL_EXISTS', field: 'email' });
      return;
    }
    throw error;
  }
  const insertId = insertData.insertId;

  // do passport login
  const loginError = await new Promise(resolve => {
    req.login(insertId, resolve);
  });
  if (loginError) {
    throw loginError;
  }

  res.status(201).json({ success: true, user: { email } });
};

export const registerStep2Handler: RequestHandler<any, AuthRegisterStep2Response, AuthRegisterStep2Request> = async (
  req,
  res
) => {
  // validate all required args exist
  if (
    new Assert(res, req.body, 'username')
      .exists()
      .isString()
      .minLength(MIN_USERNAME_LENGTH)
      .maxLength(MAX_USERNAME_LENGTH).isFailed
  )
    return;

  const { username } = req.body;
  const userId = req.user as number;

  // validate username
  if (!USERNAME_REGEX.test(username)) {
    res.status(400).json({ success: false, error: 'BAD_USERNAME', field: 'username' });
    return;
  }

  // save user or send error if it exists
  const updateData = await UserModel.setBrandNewUserUsername(userId, username);
  if (updateData.affectedRows === 0) {
    res.status(401).json({ success: false, error: 'USERNAME_ALREADY_SET' });
    return;
  }

  res.status(201).json({ success: true, user: { username } });
};
