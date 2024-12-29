import { BodyParamErrorResponse, GotExpectedBodyParamErrorResponse } from './../request-param-errors';
import { SuccessResponse } from './../success';
import { ProductNotFoundErrorResponse } from './product';

export interface SetCheckedRequest {
  productId: number;
  checked: boolean;
}
export interface SetCheckedSuccessResponse extends SuccessResponse {}

export type SetCheckedResponse =
  | SetCheckedSuccessResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse
  | ProductNotFoundErrorResponse;
