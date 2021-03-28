import { getCheckedIds } from "../filter.helpers";

describe("getCheckedIds", () => {
  test("filters ids where check is true", () => {
    expect(getCheckedIds({ a: true, b: false })).toStrictEqual(["a"]);
  });
});
