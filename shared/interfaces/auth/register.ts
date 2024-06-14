import { BodyParamErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { UserInfoResponse } from '../user/user-info';
import { AuthLoginRequest } from './login';

export interface AuthRegisterRequest extends AuthLoginRequest {
  username: string;
};

export type AuthRegisterResponse = UserInfoResponse | BodyParamErrorResponse | GotExpectedBodyParamErrorResponse;
