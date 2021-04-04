import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import styled from "styled-components";
import { Button, ButtonPropsDisplay } from "../../design/Button";
import { Collapsible } from "../../design/collapsible/Collapsible";
import { CollapsibleCheckboxList } from "../../design/collapsibleCheckboxList/CollapsibleCheckboxList";
import { Icon } from "../../design/Icon";
import { Text } from "../../design/Text";
import { CustomerFilter } from "./CustomerFilter";
import { useFilter, useFilterVariant } from "./filter.hooks";
import {
  ButtonsBox,
  FilterBox,
  ScrollList,
  SearchButton,
  StyledListSubheader,
} from "./filter.styles";
import { Status, StatusFilter } from "./StatusFilter";
import { Color, FontSize, FontWeight } from "../../design/styles";

const MinScreenWidthCollapsibleBox = styled.div`
  position: absolute;
  overflow: auto;
  bottom: 0;
  top: 64px;
  width: 100%;
  .Mui-expanded {
    z-index: 1;
  }
`;

const FilterList = ({
  checkByStatus,
  checkByUserId,
  setCheckByStatus,
  setCheckByUserId,
  onSearch,
  onReset,
  isResetDisabled,
}: {
  checkByStatus: Record<string, boolean>;
  checkByUserId: Record<string, boolean>;
  setCheckByStatus: React.Dispatch<
    React.SetStateAction<Record<Status, boolean>>
  >;
  setCheckByUserId: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  onSearch: () => void;
  onReset: () => void;
  isResetDisabled: boolean;
}) => (
  <>
    <ScrollList aria-label="filter-list" data-cy="filter-list">
      <CustomerFilter
        checkByUserId={checkByUserId}
        setCheckByUserId={setCheckByUserId}
      />
      <StatusFilter
        checkByStatus={checkByStatus}
        setCheckByStatus={setCheckByStatus}
      />
      <CollapsibleCheckboxList
        headerText="Make"
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText="Model"
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText="Year"
        items={[]}
        notificationCount={4}
      />
    </ScrollList>
    <ButtonsBox>
      <SearchButton
        variant="contained"
        size="small"
        display={ButtonPropsDisplay.Primary}
        onClick={onSearch}
        aria-label="search"
        data-cy="search-filter"
      >
        Search
      </SearchButton>
      <Button
        variant="outlined"
        size="small"
        display={ButtonPropsDisplay.Secondary}
        onClick={onReset}
        aria-label="reset"
        data-cy="reset-filter"
        disabled={isResetDisabled}
      >
        Reset
      </Button>
    </ButtonsBox>
  </>
);

export const MinScreenFilter = () => {
  const state = useFilterVariant();

  return (
    <MinScreenWidthCollapsibleBox>
      <Collapsible
        headerText="Filter"
        headerIconLeft={
          <Icon fontSize={18} margin="0 8px 0 0">
            <FilterListOutlinedIcon />
          </Icon>
        }
      >
        <FilterList
          checkByStatus={state.checkByStatus}
          checkByUserId={state.checkByUserId}
          setCheckByStatus={state.setCheckByStatus}
          setCheckByUserId={state.setCheckByUserId}
          onReset={state.onReset}
          onSearch={state.onSearch}
          isResetDisabled={state.isResetDisabled}
        />
      </Collapsible>
    </MinScreenWidthCollapsibleBox>
  );
};

export const StandardScreenFilter = () => {
  const state = useFilterVariant();

  return (
    <>
      <StyledListSubheader data-cy="filter-list-header">
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
      <FilterList
        checkByStatus={state.checkByStatus}
        checkByUserId={state.checkByUserId}
        setCheckByStatus={state.setCheckByStatus}
        setCheckByUserId={state.setCheckByUserId}
        onReset={state.onReset}
        onSearch={state.onSearch}
        isResetDisabled={state.isResetDisabled}
      />
    </>
  );
};
export const Filter = () => {
  const state = useFilter();

  return (
    <FilterBox>
      {state.isMinScreenWidth ? <MinScreenFilter /> : <StandardScreenFilter />}
    </FilterBox>
  );
};
