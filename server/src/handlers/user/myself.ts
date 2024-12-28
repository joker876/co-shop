import { UserModel } from '@models/user';
import { UserInfoResponse } from '@shared/interfaces/user/user-info';
import { getAuthUserId } from '@utils/user';
import { RequestHandler } from 'express';

export const myselfHandler: RequestHandler<null, UserInfoResponse, null, null> =
  async (req, res) => {
    const userId = getAuthUserId(req);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, error: 'NOT_FOUND_ERR' });
    }

    res.status(200).send({ success: true, user: user.toPublic() });
  };

