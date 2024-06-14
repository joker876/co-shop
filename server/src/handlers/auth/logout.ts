import { RequestHandler } from 'express';
import { AuthLogoutRequest, AuthLogoutResponse } from '../../../../shared/interfaces/auth/logout';

export const logoutHandler: RequestHandler<any, AuthLogoutResponse, AuthLogoutRequest> = async (req, res) => {
  // do passport logout
  await new Promise<void>(resolve => {
    req.logout(err => {
      if (err) throw err;
      resolve();
    });
  });
  // destroy session in db
  await new Promise<void>(resolve => {
    req.session.destroy(err => {
      if (err) throw err;
      resolve();
    });
  });

  res.clearCookie('connect.sid').status(200).json({ success: true });
};
