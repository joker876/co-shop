import { Response } from 'express';
import { AssertNumber } from './number';

export class AssertStringNumber<T extends Record<string, any>> extends AssertNumber<T> {
  constructor(
    res: Response,
    value: T,
    field: keyof T,
    public override isOk: boolean,
  ) {
    super(res, value, field, isOk);
    this.value = Number(this.body?.[this.field]);
  }
}
