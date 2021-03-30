import { A, O, pipe, R } from "../../utils/fp-ts-exports";

export const getCurrentWindowWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const getCheckedIds = <K extends string | number | symbol>(
  checkById: Record<K, boolean>
): Array<K> =>
  pipe(
    checkById,
    R.toArray,
    /**
     * unsafe cast !
     * R.toArray extends the record key to string,
     * so i'm not able to use K
     */
    (a) => a as Array<[K, boolean]>,
    A.filterMap(([k, v]) => (v ? O.some(k) : O.none))
  );
