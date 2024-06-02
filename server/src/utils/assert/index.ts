import { Response } from 'express';
import { AssertNumber } from './number';
import { AssertString } from './string';

export class Assert {
  public isOk = true;
  constructor(protected res: Response, protected value: any, protected field: string) {}

  exists() {
    if (this.isOk && this.value == null) {
      this.res.status(400).json({ success: false, error: 'FIELD_REQUIRED', field: this.field });
      this.isOk = false;
    }
    return this;
  }
  number() {
    if (this.isOk && typeof this.value != 'number') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'number' });
      this.isOk = false;
    }
    return new AssertNumber(this.res, this.value, this.field, this.isOk);
  }
  string() {
    if (this.isOk && typeof this.value != 'string') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'string' });
      this.isOk = false;
    }
    return new AssertString(this.res, this.value, this.field, this.isOk);
  }
  boolean() {
    if (this.isOk && typeof this.value != 'boolean') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'boolean' });
      this.isOk = false;
    }
    return this;
  }
  object() {
    if (this.isOk && (typeof this.value != 'object' || this.value == undefined)) {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: this.value, expected: 'object' });
      this.isOk = false;
    }
    return this;
  }
  array<T>(itemAssertFn: (res: Readonly<Response>, item: Readonly<T>, field: Readonly<string>) => boolean) {
    if (this.isOk) {
      if (!Array.isArray(this.value)) {
        this.res
          .status(400)
          .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: this.value, expected: 'object' });
        this.isOk = false;
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
