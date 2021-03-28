import { A, O, pipe, R } from "../../utils/fp-ts-exports";

export const getCheckedIds = <K extends string | number | symbol>(
  checkById: Record<K, boolean>
): Array<K> =>
  pipe(
    checkById,
    R.toArray,
    /** unsafe */
    (a) => a as Array<[K, boolean]>,
    A.filterMap(([k, v]) => (v ? O.some(k) : O.none))
  );

export const getCheckedCount = (checkById: Record<string, boolean>): number =>
  getCheckedIds(checkById).length;
