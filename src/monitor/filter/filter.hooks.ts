import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../api/api.actions";
import { getUsersById, getTranslation } from "../../api/api.selectors";
import { UserIdCarrier } from "../../api/api.types";
import { MIN_SCREEN_WIDTH } from "../../utils/constants";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import {
  getCheckedIds,
  getCurrentWindowWidth,
  areAllChecked,
} from "./filter.helpers";
import { Status } from "./StatusFilter";
import { useResize } from "../monitor.hooks";

const initCheckByStatus = {
  [Status.Connected]: true,
  [Status.Disconnected]: true,
};

export const useFilterVariant = () => {
  const [checkByUserId, setCheckByUserId] = React.useState<
    Record<UserIdCarrier, boolean>
  >({});
  const [checkByStatus, setCheckByStatus] = React.useState<
    Record<Status, boolean>
  >(initCheckByStatus);

  const dispatch = useDispatch();

  const usersById = useSelector(getUsersById);
  const translation = useSelector(getTranslation);

  const initCheckByUserId = React.useMemo(
    () =>
      pipe(
        usersById,
        RD.toOption,
        O.map((us) =>
          pipe(
            us,
            R.map((u) => true)
          )
        ),
        O.getOrElse<Record<UserIdCarrier, boolean>>(() => ({}))
      ),
    [usersById]
  );

  React.useEffect(() => {
    setCheckByUserId(initCheckByUserId);
  }, [initCheckByUserId]);

  const initFilter = () => {
    /** init with all checkboxes checked */
    setCheckByUserId(initCheckByUserId);
    setCheckByStatus(initCheckByStatus);
  };

  /** parse check records into query params */
  const getQueryParams = () => {
    const checkByUserIdQueryParams = pipe(
      getCheckedIds<UserIdCarrier>(checkByUserId),
      A.map((id) => ["ownerId", id])
    );
    const checkByStatusQueryParams = pipe(
      getCheckedIds<Status>(checkByStatus),
      A.map((i) =>
        i === Status.Connected ? ["connected", "true"] : ["connected", "false"]
      )
    );

    return [...checkByUserIdQueryParams, ...checkByStatusQueryParams];
  };

  const onSearch = () => {
    dispatch(getVehicles(getQueryParams()));
  };

  const onReset = () => {
    initFilter();
    dispatch(getVehicles());
  };

  const isResetDisabled = React.useMemo(
    () =>
      pipe(checkByUserId, areAllChecked) && pipe(checkByStatus, areAllChecked),
    [checkByStatus, checkByUserId]
  );

  return {
    dispatch,
    getQueryParams,
    checkByStatus,
    checkByUserId,
    setCheckByStatus,
    setCheckByUserId,
    onSearch,
    onReset,
    isResetDisabled,
    translation,
  };
};

export const useFilter = () => {
  const [isMinScreenWidth, setIsMinScreenWidth] = React.useState<boolean>(
    getCurrentWindowWidth() <= MIN_SCREEN_WIDTH
  );

  useResize(() => {
    setIsMinScreenWidth(getCurrentWindowWidth() <= MIN_SCREEN_WIDTH);
  });

  return {
    isMinScreenWidth,
  };
};
