import { Response } from 'express';
import { _BaseAssert } from './_base-assert';

export class AssertNumber<T extends Record<string, any>> extends _BaseAssert<T, number> {
  constructor(
    res: Response,
    value: T,
    field: keyof T,
    public override isOk: boolean
  ) {
    super(res, value, field);
  }

  isMoreThan(num: number, canBeEqual = true) {
    if (!this.isOk) return this;
    if (!(this.value > num || (canBeEqual && this.value === num))) {
      this.fail('EXPECTED_MORE_THAN', { got: this.value, expected: `>${canBeEqual ? '=' : ''} ${num}` });
    }
    return this;
  }
  isLessThan(num: number, canBeEqual = true) {
    if (!this.isOk) return this;
    if (!(this.value < num || (canBeEqual && this.value === num))) {
      this.fail('EXPECTED_LESS_THAN', { got: this.value, expected: `<${canBeEqual ? '=' : ''} ${num}` });
    }
    return this;
  }
  isBetween(min: number, max: number, canBeEqual = true) {
    if (!this.isOk) return this;
    if (!((this.value > min && this.value < max) || (canBeEqual && (this.value === min || this.value === max)))) {
      this.fail('EXPECTED_BETWEEN', {
        got: this.value,
        expected: `${min} <${canBeEqual ? '=' : ''} x <${canBeEqual ? '=' : ''} ${max}`,
      });
    }
    return this;
  }
  isInteger() {
    if (!this.isOk) return this;
    if (this.value % 1 !== 0) {
      this.fail('EXPECTED_INTEGER', { got: this.value });
    }
    return this;
  }
}
