import React from "react";
import { Translation } from "../../api/api.types";
import { Button, ButtonPropsDisplay } from "../../design/Button";
import { CollapsibleCheckboxList } from "../../design/collapsibleCheckboxList/CollapsibleCheckboxList";
import { CustomerFilter } from "./CustomerFilter";
import { ButtonsBox, ScrollList, SearchButton } from "./filter.styles";
import { Status, StatusFilter } from "./StatusFilter";

type Props = {
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
};

export const FilterList = (props: Props) => (
  <>
    <ScrollList aria-label="filter-list" data-cy="filter-list">
      <CustomerFilter
        checkByUserId={props.checkByUserId}
        setCheckByUserId={props.setCheckByUserId}
      />
      <StatusFilter
        checkByStatus={props.checkByStatus}
        setCheckByStatus={props.setCheckByStatus}
      />
      <CollapsibleCheckboxList
        headerText={props.translation.filterCategories.make}
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText={props.translation.filterCategories.model}
        items={[]}
        notificationCount={4}
      />
      <CollapsibleCheckboxList
        headerText={props.translation.filterCategories.year}
        items={[]}
        notificationCount={4}
      />
    </ScrollList>
    <ButtonsBox>
      <SearchButton
        variant="contained"
        size="small"
        display={ButtonPropsDisplay.Primary}
        onClick={props.onSearch}
        aria-label="search"
        data-cy="search-filter"
      >
        {props.translation.searchButton}
      </SearchButton>
      <Button
        variant="outlined"
        size="small"
        display={ButtonPropsDisplay.Secondary}
        onClick={props.onReset}
        aria-label="reset"
        data-cy="reset-filter"
        disabled={props.isResetDisabled}
      >
        {props.translation.resetButton}
      </Button>
    </ButtonsBox>
  </>
);
