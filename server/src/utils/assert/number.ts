import { Response } from 'express';

export class AssertNumber {
  constructor(
    protected readonly res: Response,
    protected readonly value: any,
    protected readonly field: string,
    public isOk: boolean
  ) {}

  moreThan(num: number, canBeEqual = false) {
    if (!this.isOk) return this;
    if (!(this.value > num || (canBeEqual && this.value === num))) {
      this.res.status(400).json({
        success: false,
        error: 'EXPECTED_MORE_THAN',
        field: this.field,
        got: this.value,
        expected: `>${canBeEqual ? '=' : ''} ${num}`,
      });
      this.isOk = false;
    }
    return this;
  }
  lessThan(num: number, canBeEqual = false) {
    if (!this.isOk) return this;
    if (!(this.value < num || (canBeEqual && this.value === num))) {
      this.res.status(400).json({
        success: false,
        error: 'EXPECTED_LESS_THAN',
        field: this.field,
        got: this.value,
        expected: `<${canBeEqual ? '=' : ''} ${num}`,
      });
      this.isOk = false;
    }
    return this;
  }
  isInteger() {
    if (!this.isOk) return this;
    if (this.value % 1 !== 0) {
      this.res.status(400).json({ success: false, error: 'EXPECTED_INTEGER', field: this.field, got: this.value });
      this.isOk = false;
    }
    return this;
  }
}
