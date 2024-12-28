import { Response } from 'express';
import { _BaseAssert } from './_base-assert';

export class AssertString<T extends Record<string, any>> extends _BaseAssert<T, string> {
  constructor(res: Response, value: T, field: keyof T, public override isOk: boolean) {
    super(res, value, field);
  }

  maxLength(length: number) {
    if (!this.isOk) return this;
    if (this.value.length > length) {
      this.fail('TOO_LONG', { gotLength: this.value.length, expected: `<= ${length}` });
    }
    return this;
  }
  minLength(length: number) {
    if (!this.isOk) return this;
    if (this.value.length < length) {
      this.fail('TOO_SHORT', { gotLength: this.value.length, expected: `>= ${length}` });
    }
    return this;
  }
  exactLength(length: number) {
    if (!this.isOk) return this;
    if (this.value.length < length) {
      this.fail('WRONG_LENGTH', { gotLength: this.value.length, expected: length });
    }
    return this;
  }
  match(regex: RegExp) {
    if (!this.isOk) return this;
    if (!this.value.match(regex)) {
      this.fail('PATTERN_NOT_MATCHING', { got: this.value, expected: regex });
    }
    return this;
  }
}
