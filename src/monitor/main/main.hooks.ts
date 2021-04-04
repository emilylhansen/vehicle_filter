import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid } from "react-window";
import { getUsers, getVehicles, setVehicles } from "../../api/api.actions";
import {
  getCells,
  getVehiclesByIdNewStatus,
  getTranslation,
} from "../../api/api.selectors";
import { O, pipe } from "../../utils/fp-ts-exports";
import { useResize } from "../monitor.hooks";
import { getColumnCount } from "./main.helpers";

const MS_PER_S = 1000;
const S_PER_M = 60;
const MS_PER_M = MS_PER_S * S_PER_M;

/** thanks dan abramov */
export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = React.useRef<() => void>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    const tick = () => {
      pipe(
        savedCallback.current,
        O.fromNullable,
        O.map((cur) => () => {
          cur();
        }),
        O.getOrElse(() => () => {}),
        (thnk) => thnk()
      );
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useMain = () => {
  const gridRef = React.createRef<FixedSizeGrid>();
  const mainRef = React.createRef<HTMLDivElement>();
  const [width, setWidth] = React.useState<number>(0);

  const dispatch = useDispatch();

  const cells = useSelector(getCells);
  const vehiclesByIdNewStatus = useSelector(getVehiclesByIdNewStatus);
  const translation = useSelector(getTranslation);

  useResize(() => {
    pipe(
      mainRef.current,
      O.fromNullable,
      O.map((el) => el.clientWidth),
      O.getOrElse(() => 0),
      setWidth
    );
  });

  useInterval(() => {
    console.log("poll data");
    /** change vehicle connection status every minute */
    dispatch(setVehicles(vehiclesByIdNewStatus));
  }, MS_PER_M);

  const scrollToTop = () => {
    /**
     * Unable to use window smooth scroll with react-window,
     * since it would require the library to render all items.
     */
    pipe(
      gridRef.current,
      O.fromNullable,
      O.map((r) => () => {
        r.scrollToItem({
          rowIndex: 0,
          align: "start",
        });
      }),
      O.getOrElse(() => () => {}),
      (io) => io()
    );
  };

  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getVehicles());
  }, [dispatch]);

  const columnCount = getColumnCount(width);

  /** get list index given grid coords */
  const getListIndex = ({
    columnIndex,
    rowIndex,
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => rowIndex * (columnCount - 1) + (columnIndex + rowIndex);

  return {
    cells,
    scrollToTop,
    gridRef,
    mainRef,
    getListIndex,
    columnCount,
    translation,
  };
};
