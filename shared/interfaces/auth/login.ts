import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { UserInfoResponse } from './../user/user-info';

export interface AuthLoginRequest {
  email: string;
  password: string;
};

export type AuthLoginResponse = UserInfoResponse | ErrorResponse | BodyParamErrorResponse | GotExpectedBodyParamErrorResponse;
