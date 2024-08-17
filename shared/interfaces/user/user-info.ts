import { SuccessResponse } from "../success";

export interface UserInfoResponse extends SuccessResponse {
  user: UserInfo;
}
export interface PartialUserInfoResponse extends SuccessResponse {
  user: Partial<UserInfo>;
}
export interface UserInfo {
  email: string;
  username: string;
}
