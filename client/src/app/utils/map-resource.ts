export function mapResource<T extends object>(obj: T & { success: boolean }) {
  if (obj?.success === false) return null;
  return new ResourceMapper<T>(obj);
}
type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type KeysOfArrayProps<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T] &
  string;

class ResourceMapper<T> {
  private obj!: T;
  constructor(obj: T) {
    this.obj = { ...obj };
  }

  public return() {
    return this.obj;
  }
  public mapDate<K extends string & keyof T>(key: K): ResourceMapper<T> {
    if (this.obj?.[key]) {
      this.obj[key] = new Date(this.obj[key] as any) as any;
    }
    return this;
  }
  public mapArray<K extends KeysOfArrayProps<T>, U extends ArrayElement<T[K]>>(
    key: K,
    mapFn: (v: ResourceMapper<U>) => U
  ): ResourceMapper<T> {
    if (Array.isArray(this.obj?.[key])) {
      this.obj[key] = (this.obj[key] as U[]).map(v => mapFn(new ResourceMapper<U>(v))) as any;
    }
    return this;
  }
}
