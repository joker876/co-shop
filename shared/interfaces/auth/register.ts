import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { PartialUserInfoResponse } from '../user/user-info';
import { AuthLoginRequest } from './login';

export interface AuthRegisterStep1Request extends AuthLoginRequest {};
export interface AuthRegisterStep2Request {
  username: string;
};

export type AuthRegisterStep1Response = PartialUserInfoResponse | BodyParamErrorResponse | GotExpectedBodyParamErrorResponse;
export type AuthRegisterStep2Response = PartialUserInfoResponse | BodyParamErrorResponse | GotExpectedBodyParamErrorResponse | ErrorResponse;
