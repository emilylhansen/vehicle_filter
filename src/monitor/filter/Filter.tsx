import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import styled, { withTheme } from "styled-components";
import { Translation } from "../../api/api.types";
import { Button, ButtonPropsDisplay } from "../../design/Button";
import { Collapsible } from "../../design/collapsible/Collapsible";
import { CollapsibleCheckboxList } from "../../design/collapsibleCheckboxList/CollapsibleCheckboxList";
import { Icon } from "../../design/Icon";
import { FontSize, FontWeight } from "../../design/styles";
import { Text } from "../../design/Text";
import { Theme } from "../../design/theme";
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
  translation,
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
  translation: Translation;
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
        headerText={translation.filterCategories.make}
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText={translation.filterCategories.model}
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText={translation.filterCategories.year}
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
        {translation.searchButton}
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
        {translation.resetButton}
      </Button>
    </ButtonsBox>
  </>
);

export const MinScreenFilter = () => {
  const state = useFilterVariant();

  return (
    <MinScreenWidthCollapsibleBox>
      <Collapsible
        headerText={state.translation.filterHeader}
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
          translation={state.translation}
        />
      </Collapsible>
    </MinScreenWidthCollapsibleBox>
  );
};

export const StandardScreenFilter = withTheme((props: { theme: Theme }) => {
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
          color={props.theme.color1}
        >
          {state.translation.filterHeader}
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
        translation={state.translation}
      />
    </>
  );
});

export const Filter = () => {
  const state = useFilter();

  return (
    <FilterBox>
      {state.isMinScreenWidth ? <MinScreenFilter /> : <StandardScreenFilter />}
    </FilterBox>
  );
};
