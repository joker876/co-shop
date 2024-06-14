import { RequestHandler } from 'express';

export const logoutHandler: RequestHandler<any, { success: true } | unknown, null> = async (req, res) => {
  // do passport logout
  await new Promise<void>(resolve => {
    req.logout(err => {
      if (err) throw err;
      resolve();
    });
  });
  await new Promise<void>(resolve => {
    req.session.destroy(err => {
      if (err) throw err;
      resolve();
    });
  });

  res.clearCookie('connect.sid').status(200).json({ success: true });
};
