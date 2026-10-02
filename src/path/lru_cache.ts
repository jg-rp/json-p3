/**
 * A Least Recently Used cache, implemented as an extended Map.
 */
export class LRUCache<K, V> extends Map<K, V> {
  readonly maxSize: number;

  constructor(maxSize: number = 128, entries?: Iterable<[K, V]>) {
    if (entries !== undefined) {
      super(entries);
    } else {
      super();
    }
    this.maxSize = maxSize;
  }

  override get(key: K): V | undefined {
    const val = super.get(key);
    if (this.has(key)) {
      this.delete(key);
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      this.set(key, val as V);
    }
    return val;
  }

  override set(key: K, value: V): this {
    if (this.has(key)) {
      this.delete(key);
    } else if (this.size >= this.maxSize) {
      const first = this.first();
      if (first !== undefined) {
        this.delete(first);
      }
    }
    return super.set(key, value);
  }

  first() {
    return this.keys().next().value;
  }
}
