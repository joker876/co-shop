import { ErrorResponse } from "../request-param-errors";


export interface Product {
  id: number;
  name: string;
  checked: boolean;
  listId: number;
}

export interface ProductNotFoundErrorResponse extends ErrorResponse {
  error: 'NOT_FOUND_ERR';
}