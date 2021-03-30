import React from "react";
import { VariableSizeList } from "react-window";
import { A, O, pipe } from "../../utils/fp-ts-exports";
import { isNil } from "../../utils/utils";
import { Collapsible } from "../collapsible/Collapsible";
import {
  LIST_HEADER_HEIGHT,
  LIST_ITEM_HEIGHT,
  OVERSCAN_COUNT,
} from "../collapsible/collapsible.constants";
import { SearchInputProps } from "../SearchInput";
import { CheckboxListItem } from "./CheckboxListItem";

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
  search?: SearchInputProps;
  headerIconLeft?: JSX.Element;
};

const useCollapsibleCheckboxList = (props: CollapsibleCheckboxListProps) => {
  /** count of items matching filters */
  const itemCount = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => props.items.length + 1),
    O.getOrElse(() => props.items.length)
  );

  /** calculate grid height */
  const _gridHeight = props.items.length * LIST_ITEM_HEIGHT;
  const gridHeight = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => _gridHeight + LIST_HEADER_HEIGHT),
    O.getOrElse(() => _gridHeight)
  );

  const shouldHandleSearch = (index: number) =>
    index === 0 && !isNil(props.search);

  /** height for each row */
  const getItemSize = (index: number) =>
    shouldHandleSearch(index) ? LIST_HEADER_HEIGHT : LIST_ITEM_HEIGHT;

  return {
    itemCount,
    gridHeight,
    shouldHandleSearch,
    getItemSize,
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
      <VariableSizeList
        height={state.gridHeight}
        itemCount={state.itemCount}
        itemSize={state.getItemSize}
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
