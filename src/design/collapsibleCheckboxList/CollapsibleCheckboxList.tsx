import React from "react";
import { VariableSizeList } from "react-window";
import styled from "styled-components";
import { A, O, pipe } from "../../utils/fp-ts-exports";
import { Collapsible } from "../collapsible/Collapsible";
import {
  LIST_ITEM_HEIGHT,
  OVERSCAN_COUNT,
} from "../collapsible/collapsible.constants";
import {
  SearchInput,
  PassedProps as SearchInputPassedProps,
} from "../SearchInput";
import { CheckboxListItem } from "./CheckboxListItem";

export const SearchInputBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

export type CheckboxListItemProps = {
  primaryText: string;
  secondaryText?: string;
  rightAdornment?: JSX.Element;
  key: string;
  checked: boolean;
  onChange: (c: boolean) => void;
};

type CollapsibleCheckboxListProps = {
  headerText: string;
  notificationCount: number;
  items: Array<CheckboxListItemProps>;
  search?: SearchInputPassedProps;
  headerIconLeft?: JSX.Element;
};

const useCollapsibleCheckboxList = (props: CollapsibleCheckboxListProps) => {
  /** calculate grid height */
  const gridHeight = props.items.length * LIST_ITEM_HEIGHT;

  return {
    gridHeight,
  };
};

export const CollapsibleCheckboxList = (
  props: CollapsibleCheckboxListProps
) => {
  const state = useCollapsibleCheckboxList(props);

  return (
    <Collapsible
      headerText={props.headerText}
      headerIconLeft={props.headerIconLeft}
      notificationCount={props.notificationCount}
    >
      {pipe(
        props.search,
        O.fromNullable,
        O.map((s) => (
          <SearchInputBox>
            <SearchInput value={s.value} onChange={s.onChange} />
          </SearchInputBox>
        )),
        O.toNullable
      )}
      <VariableSizeList
        height={state.gridHeight}
        itemCount={props.items.length}
        itemSize={(_) => LIST_ITEM_HEIGHT}
        width="100%"
        overscanCount={OVERSCAN_COUNT}
        /** data-cy and aria-label don't work, use className instead */
        className="collapsible-list"
      >
        {({ index, style }) =>
          pipe(
            props.items,
            A.lookup(index),
            O.map((i) => <CheckboxListItem item={i} style={style} />),
            O.toNullable
          )
        }
      </VariableSizeList>
    </Collapsible>
  );
};
