import fc from "fast-check";
import { torqueRev, offsetRev } from "../transform";

describe("func torqueRev", () => {
  test("passing any integer x, should return x * 1000", () => {
    fc.assert(
      fc.property(fc.integer(), (x) => expect(torqueRev(x)).toBe(x * 1000))
    );
  });
});

describe("func offsetRev", () => {
  test("passing any positive i16 x, should return x * 1000", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: (1 << 15) - 1 }), (x) =>
        expect(offsetRev(x)).toBe(x * 1000)
      )
    );
  });

  test("passing any negative i16 x, should return 2^15 + (x * 1000)", () => {
    fc.assert(
      fc.property(fc.integer({ min: ~(1 << 15) + 1, max: -1 }), (x) =>
        expect(offsetRev(x)).toBe((1 << 15) + x * 1000)
      )
    );
  });
});
