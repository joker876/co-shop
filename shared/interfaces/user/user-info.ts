export interface UserInfoResponse {
  success: true;
  user: UserInfo;
}
export interface PartialUserInfoResponse {
  success: true;
  user: Partial<UserInfo>;
}
export interface UserInfo {
  email: string;
  username: string;
}
