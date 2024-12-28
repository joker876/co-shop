import { Response } from 'express';

export class _BaseAssert<T extends Record<string, any>, ForcedValueType = T[keyof T]> {
  protected value: ForcedValueType;
  protected readonly field!: keyof T & string;
  constructor(
    protected readonly res: Response,
    protected readonly body: T,
    field: keyof T
  ) {
    this.field = field as keyof T & string;
    this.value = body[field] as ForcedValueType;
  }

  public isOk: boolean = true;
  public get isFailed(): boolean {
    return !this.isOk;
  }

  protected fail(errorCode: string, extra?: Record<string, any>) {
    this.res.status(400).json({
      success: false,
      error: errorCode,
      field: this.field,
      ...extra,
    });
    this.isOk = false;
  }
}
