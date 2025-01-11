import { ErrorResponse } from '../request-param-errors';

export const ProductUnit = {
  Piece: 'pc',
  Box: 'box',
  Kilogram: 'kg',
  Decagram: 'dag',
  Pound: 'lb',
  Gram: 'g',
  Ounce: 'oz',
  Liter: 'l',
  Milliliter: 'ml',
  FluidOunce: 'floz',
  Gallon: 'gal',
} as const;
export type ProductUnit = (typeof ProductUnit)[keyof typeof ProductUnit];

export interface Product {
  id: number;
  name: string;
  checked: boolean;
  listId: number;
  amount: number;
  unit: ProductUnit;
}

export interface ProductNotFoundErrorResponse extends ErrorResponse {
  error: 'NOT_FOUND_ERR';
}
