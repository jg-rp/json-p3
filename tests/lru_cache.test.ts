import { LRUCache } from "../src/lru_cache";

describe("lru_cache", () => {
  test("init with entries", () => {
    const cache = new LRUCache<string, number>(undefined, [
      ["a", 1],
      ["b", 2],
    ]);

    expect(cache.maxSize).toBe(128);
    expect(Array.from(cache.keys())).toStrictEqual(["a", "b"]);
  });
  test("expire cache key", () => {
    const cache = new LRUCache<string, number>(2, [
      ["a", 1],
      ["b", 2],
    ]);

    expect(cache.size).toBe(2);
    expect(Array.from(cache.keys())).toStrictEqual(["a", "b"]);
    cache.set("c", 42);
    expect(cache.size).toBe(2);
    expect(Array.from(cache.keys())).toStrictEqual(["b", "c"]);
  });
  test("use an existing key", () => {
    const cache = new LRUCache<string, number>(2, [
      ["a", 1],
      ["b", 2],
    ]);

    expect(cache.size).toBe(2);
    expect(Array.from(cache.keys())).toStrictEqual(["a", "b"]);
    cache.set("a", 42);
    expect(cache.size).toBe(2);
    expect(Array.from(cache.keys())).toStrictEqual(["b", "a"]);
    cache.set("c", 7);
    expect(cache.size).toBe(2);
    expect(Array.from(cache.keys())).toStrictEqual(["a", "c"]);
  });
});
