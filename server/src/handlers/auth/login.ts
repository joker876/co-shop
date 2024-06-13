import { Assert } from '@assert';
import { UserModel } from '@models/user';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utils/regexes';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';

export const loginHandler = async (req: Request, res: Response) => {
  // validate all required args exist
  if (!new Assert(res, req.body?.email, 'email').exists().string().minLength(6).maxLength(256).isOk) return;
  if (!new Assert(res, req.body?.password, 'password').exists().string().minLength(6).isOk) return;

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

  // find user and verify their password
  const user = await UserModel.findByEmail(email);
  if (!user || !compareSync(password, user.password)) {
    res.status(400).json({ success: false, error: 'WRONG_USERNAME_OR_PASSWORD' });
    return;
  }

  // do passport login
  const loginError = await new Promise(resolve => {
    req.login(user.id, resolve);
  });
  if (loginError) {
    throw loginError;
  }

  res.status(200).json({ success: true, user: { email, username: user.username } });
};
