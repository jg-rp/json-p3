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

  get(key: K): V | undefined {
    const val = super.get(key);
    if (this.has(key)) {
      this.delete(key);
      this.set(key, val as V);
    }
    return val;
  }

  set(key: K, value: V): this {
    if (this.has(key)) {
      this.delete(key);
    } else if (this.size >= this.maxSize) {
      this.delete(this.first());
    }
    return super.set(key, value);
  }

  first() {
    return this.keys().next().value;
  }
}
