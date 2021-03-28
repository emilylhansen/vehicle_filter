import { getColumnCount } from "../main.helpers";

describe("getColumnCount", () => {
  test("gets column count for a small screen", () => {
    expect(getColumnCount(100)).toBe(1);
  });

  test("gets column count for a standard screen", () => {
    expect(getColumnCount(1600)).toBe(4);
  });

  test("gets column count for a large screen", () => {
    expect(getColumnCount(2000)).toBe(6);
  });
});
