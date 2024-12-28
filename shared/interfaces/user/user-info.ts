import { ErrorResponse } from '../request-param-errors';
import { SuccessResponse } from '../success';

export type UserInfoResponse = UserInfoSuccessResponse | UserNotFoundErrorResponse;

export interface UserInfoSuccessResponse extends SuccessResponse {
  user: UserInfo;
}
export interface PartialUserInfoSuccessResponse extends SuccessResponse {
  user: Partial<UserInfo>;
}
export interface UserInfo {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
}
export interface UserNotFoundErrorResponse extends ErrorResponse {
  success: false;
  error: 'NOT_FOUND_ERR';
}
