import { Assert } from "@assert";
import { UserModel } from "@models/user";
import { hashPassword } from "@utils/encryption";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "@utils/regexes";
import { Request, Response } from "express";

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

  // check if email exists in DB
  if (await UserModel.doesEmailExist(email)) {
    res.status(409).json({ success: false, error: 'EMAIL_EXISTS', field: 'email' });
    return;
  }

  const hashedPassword = hashPassword(password);

  await UserModel.createNewUser(email, username, hashedPassword);

  const token = 'test';
  res.status(201).cookie('token', `Bearer ${token}`).json({ success: true, user: { email, username } });
};
