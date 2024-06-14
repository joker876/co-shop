import { BodyParamErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';

export type AuthRegisterRequest = {
  email: string;
  username: string;
  password: string;
};

export type AuthRegisterResponse =
  | {
      success: true;
      user: {
        email: string;
        username: string;
      };
    }
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;
