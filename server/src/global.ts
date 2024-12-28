export {  };

declare global {
  /**
   * Infers the type returned by `toPublic()`
   * if it exists, otherwise leaves the type as-is.
   */
  type Public<T> = T extends { toPublic(): infer R } ? R : T;

  interface Array<T> {
    /**
     * Maps over each element in the array. If an element has a `toPublic()`
     * method, its return type is used; otherwise the element is unchanged.
     */
    toPublic(): Array<Public<T>>;
  }
}

Object.defineProperty(Array.prototype, 'toPublic', {
  value: function () {
    return this.map((item: unknown) => {
      if (item && typeof item === 'object' && 'toPublic' in item && typeof item.toPublic === 'function') {
        return item.toPublic();
      }
      return item;
    });
  },
  writable: true,
  configurable: true,
  enumerable: false,
});
