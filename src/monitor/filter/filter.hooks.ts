import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../api/api.actions";
import { getUsersById, getWindowWidth } from "../../api/api.selectors";
import { UserIdCarrier } from "../../api/api.types";
import { MIN_SCREEN_WIDTH } from "../../utils/constants";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { getCheckedIds } from "./filter.helpers";
import { Status } from "./StatusFilter";

const initCheckByStatus = {
  [Status.Connected]: true,
  [Status.Disconnected]: true,
};

export const useFilter = () => {
  const [checkByUserId, setCheckByUserId] = React.useState<
    Record<UserIdCarrier, boolean>
  >({});
  const [checkByStatus, setCheckByStatus] = React.useState<
    Record<Status, boolean>
  >(initCheckByStatus);
  const dispatch = useDispatch();

  const usersById = useSelector(getUsersById);
  const windowWidth = useSelector(getWindowWidth);

  const isMinScreenWidth = windowWidth <= MIN_SCREEN_WIDTH;

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

  return {
    dispatch,
    getQueryParams,
    checkByStatus,
    checkByUserId,
    setCheckByStatus,
    setCheckByUserId,
    onSearch,
    onReset,
    isMinScreenWidth,
  };
};
