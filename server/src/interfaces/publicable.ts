export interface Publicable<T extends Record<string, any>> {
  toPublic(): T;
}