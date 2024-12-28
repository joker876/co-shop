import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { UserInfoSuccessResponse } from './../user/user-info';

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export type AuthLoginResponse =
  | UserInfoSuccessResponse
  | ErrorResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;
