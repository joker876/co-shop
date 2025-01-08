import { Assert } from '@assert';
import { UserModel } from '@models/user';
import { AuthLoginRequest, AuthLoginResponse } from '@shared/interfaces/auth/login';
import { MAX_EMAIL_LENGTH, MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '@utils/constants';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utils/regexes';
import { compareSync } from 'bcrypt';
import { RequestHandler } from 'express';

export const loginHandler: RequestHandler<null, AuthLoginResponse, AuthLoginRequest> = async (req, res) => {
  console.log(req.body);
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

  // find user and verify their password
  const user = await UserModel.findByEmail(email);

  if (!user || (req.isLocalhost ? password !== user.password : !compareSync(password, user.password))) {
    res.status(400).json({ success: false, error: 'WRONG_EMAIL_OR_PASSWORD' });
    return;
  }

  // do passport login
  if (!req.isAuthenticated()) {
    await new Promise<void>(resolve => {
      req.login(user.id, err => {
        if (err) throw err;
        resolve();
      });
    });
  } else {
    req.session.touch();
  }

  await UserModel.updateLastLogin(user.id);

  res.status(200).json({ success: true, user: user.toPublic() });
};
