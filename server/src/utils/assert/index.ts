import { Response } from 'express';
import { _BaseAssert } from './_base-assert';
import { AssertNumber } from './number';
import { AssertString } from './string';

export class Assert<T extends Record<string, any>> extends _BaseAssert<T> {
  exists() {
    if (this.isOk && this.value == undefined) {
      this.fail('FIELD_REQUIRED');
    }
    return this;
  }
  isNumber() {
    if (this.isOk && typeof this.value != 'number') {
      this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'number' });
    }
    return new AssertNumber(this.res, this.body, this.field, this.isOk);
  }
  isString() {
    if (this.isOk && typeof this.value != 'string') {
      this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'string' });
    }
    return new AssertString(this.res, this.body, this.field, this.isOk);
  }
  isStringNumber() {
    const num = Number(this.value);
    if (this.isOk && typeof this.value != 'string') {
      this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'string' });
    }
    if (this.isOk && isNaN(num)) {
      this.fail('PARSING_ERROR', { expected: `Number(${this.value}) !== NaN` });
    }
    return new AssertNumber(this.res, this.body, this.field, this.isOk);
  }
  isBoolean() {
    if (this.isOk && typeof this.value != 'boolean') {
      this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'boolean' });
    }
    return this;
  }
  isObject() {
    if (this.isOk && (this.value == undefined || typeof this.value != 'object')) {
      this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'object' });
    }
    return this;
  }
  isArray<T>(itemAssertFn: (res: Readonly<Response>, item: Readonly<T>, field: Readonly<string>) => boolean) {
    if (this.isOk) {
      if (!Array.isArray(this.value)) {
        this.fail('TYPE_ERROR', { got: typeof this.value, expected: 'array' });
        return this;
      }
      for (let i = 0; i < this.value.length; i++) {
        const item = this.value[i];
        if (!itemAssertFn(this.res, item, `${this.field}[${i}]`)) {
          this.isOk = false;
          return this;
        }
      }
    }
    return this;
  }
}
