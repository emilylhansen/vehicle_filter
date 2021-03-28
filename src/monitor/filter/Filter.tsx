import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../api/actions";
import { UserIdCarrier } from "../../api/types";
import { Button, ButtonPropsDisplay } from "../../design/Button";
import { Collapsible } from "../../design/collapsible/Collapsible";
import { Icon } from "../../design/Icon";
import { Color, FontSize, FontWeight } from "../../design/styles";
import { Text } from "../../design/Text";
import { getUsersById } from "../../selectors";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { CustomerFilter } from "./CustomerFilter";
import { getCheckedIds } from "./filter.helpers";
import {
  ButtonsBox,
  FilterBox,
  ScrollList,
  SearchButton,
  StyledListSubheader,
} from "./filter.styles";
import { Status, StatusFilter } from "./StatusFilter";

const initCheckByStatus = {
  [Status.Connected]: true,
  [Status.Disconnected]: true,
};

const useFilter = () => {
  const [checkByUserId, setCheckByUserId] = React.useState<
    Record<UserIdCarrier, boolean>
  >({});
  const [checkByStatus, setCheckByStatus] = React.useState<
    Record<Status, boolean>
  >(initCheckByStatus);

  const dispatch = useDispatch();

  const usersById = useSelector(getUsersById);

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

  const initFilter = () => {
    /** init with all checkboxes checked */
    setCheckByUserId(initCheckByUserId);
    setCheckByStatus(initCheckByStatus);
  };

  React.useEffect(() => {
    initFilter();
  }, []);

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
  };
};

export const Filter = () => {
  const state = useFilter();

  return (
    <FilterBox>
      <ScrollList aria-label="categories list">
        <StyledListSubheader>
          <Icon fontSize={18} margin="0 8px 0 0">
            <FilterListOutlinedIcon />
          </Icon>
          <Text
            fontSize={FontSize.Size2}
            fontWeight={FontWeight.Weight4}
            color={Color.Gray1}
          >
            Filter
          </Text>
        </StyledListSubheader>
        <CustomerFilter
          checkByUserId={state.checkByUserId}
          setCheckByUserId={state.setCheckByUserId}
        />
        <StatusFilter
          checkByStatus={state.checkByStatus}
          setCheckByStatus={state.setCheckByStatus}
        />
        {/** presentational additional categories */}
        <Collapsible headerText="Make" items={[]} notificationCount={4} />
        <Collapsible headerText="Model" items={[]} notificationCount={4} />
        <Collapsible headerText="Year" items={[]} notificationCount={4} />
      </ScrollList>

      <ButtonsBox>
        <SearchButton
          variant="contained"
          size="small"
          display={ButtonPropsDisplay.Primary}
          onClick={state.onSearch}
          aria-label="search"
        >
          Search
        </SearchButton>
        <Button
          variant="outlined"
          size="small"
          display={ButtonPropsDisplay.Secondary}
          onClick={state.onReset}
          aria-label="reset"
        >
          Reset
        </Button>
      </ButtonsBox>
    </FilterBox>
  );
};
