import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { Product } from './../product/product';
import { SuccessResponse } from './../success';

export interface List {
  id: number;
  name: string;
  shop: string | null;
  date: Date | null;
}

export type ListResponse =
  | ListSuccessResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse
  | ListNotFoundErrorResponse;

export interface ListSuccessResponse extends SuccessResponse {
  list: List;
  products: Product[];
}

export interface ListNotFoundErrorResponse extends ErrorResponse {
  error: 'NOT_FOUND_ERR';
}
