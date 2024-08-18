import { Response } from 'express';
import { AssertNumber } from './number';

export class AssertStringNumber extends AssertNumber {
  constructor(
    res: Response,
    value: any,
    field: string,
    public override isOk: boolean,
  ) {
    super(res, value, field, isOk);
    this.value = Number(this.body?.[this.field]);
  }
}
