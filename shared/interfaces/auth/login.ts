import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse =
  | {
      success: true;
      user: {
        email: string;
        username: string;
      };
  }
  | ErrorResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;
