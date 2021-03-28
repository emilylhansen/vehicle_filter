import ListSubheader from "@material-ui/core/ListSubheader";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getVehicles } from "../../api/actions";
import { UserIdCarrier, Vehicle, UserId } from "../../api/types";
import { Button, ButtonPropsDisplay } from "../../design/Button";
import { Collapsible } from "../../design/Collapsible";
import { Icon } from "../../design/Icon";
import { Color, FontSize, FontWeight } from "../../design/styles";
import { Text } from "../../design/Text";
import { getUsersById } from "../../selectors";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { CustomerFilter } from "./CustomerFilter";
import { Status, StatusFilter } from "./StatusFilter";
import { getCheckedIds } from "./filter.helpers";

const FilterBox = styled.div`
  grid-area: filter;
  display: flex;
  flex-flow: column;
  border-right: 1px solid ${Color.Gray4};
  overflow: auto;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-flow: column;
  padding: 16px;
`;

const ScrollList = styled.div`
  flex: 1;
  overflow: auto;

  > * {
    border-bottom: 1px solid ${Color.Gray4};
  }
`;

const SearchButton = styled(Button)`
  margin-bottom: 4px;
`;

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  align-items: center;
  height: 48px;
  background-color: ${Color.White};
`;

const initCheckByStatus = {
  [Status.Connected]: true,
  [Status.Disconnected]: true,
};

export const Filter = () => {
  const [checkByUserId, setCheckByUserId] = React.useState<
    Record<UserIdCarrier, boolean>
  >({});
  const [checkByStatus, setCheckByStatus] = React.useState<
    Record<Status, boolean>
  >(initCheckByStatus);

  const params = () => {
    const checkByUserIdParams = pipe(
      getCheckedIds<UserIdCarrier>(checkByUserId),
      A.map((id) => ["ownerId", id])
    );
    const checkByStatusParams = pipe(
      getCheckedIds<Status>(checkByStatus),
      A.map((i) =>
        i === Status.Connected ? ["connected", "true"] : ["connected", "false"]
      )
    );

    return [...checkByUserIdParams, ...checkByStatusParams];
  };

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
    setCheckByUserId(initCheckByUserId);
    setCheckByStatus(initCheckByStatus);
  };

  React.useEffect(() => {
    initFilter();
  }, []);

  const dispatch = useDispatch();

  return (
    <FilterBox>
      <ScrollList>
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
          checkByUserId={checkByUserId}
          setCheckByUserId={setCheckByUserId}
        />
        <StatusFilter
          checkByStatus={checkByStatus}
          setCheckByStatus={setCheckByStatus}
        />
        <Collapsible headerText="Make" items={[]} notificationCount={4} />
        <Collapsible headerText="Model" items={[]} notificationCount={4} />
        <Collapsible headerText="Year" items={[]} notificationCount={4} />
      </ScrollList>

      <ButtonsBox>
        <SearchButton
          variant="contained"
          size="small"
          display={ButtonPropsDisplay.Primary}
          onClick={() => dispatch(getVehicles(params()))}
        >
          Search
        </SearchButton>
        <Button
          variant="outlined"
          size="small"
          display={ButtonPropsDisplay.Secondary}
          onClick={() => {
            initFilter();
            dispatch(getVehicles());
          }}
        >
          Reset
        </Button>
      </ButtonsBox>
    </FilterBox>
  );
};
