import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { PartialUserInfoSuccessResponse } from '../user/user-info';
import { AuthLoginRequest } from './login';

export interface AuthRegisterStep1Request extends AuthLoginRequest {}
export interface AuthRegisterStep2Request {
  username: string;
}

export type AuthRegisterStep1Response =
  | PartialUserInfoSuccessResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;
export type AuthRegisterStep2Response =
  | PartialUserInfoSuccessResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse
  | ErrorResponse;
