import fc from "fast-check";
import { torqueRev } from "../transform";

describe("func torqueRev", () => {
  test("passing any integer x, should return x * 1000", () => {
    fc.assert(
      fc.property(fc.integer(), (num) =>
        expect(torqueRev(num)).toBe(num * 1000)
      )
    );
  });
});
