import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { VariableSizeList } from "react-window";
import { A, O, pipe } from "../../utils/fp-ts-exports";
import { isNil } from "../../utils/utils";
import { SearchInput, SearchInputProps } from "../SearchInput";
import { FontSize, FontWeight } from "../styles";
import { Text } from "../Text";
import { CollapsibleListItem } from "./collapsible.components";
import {
  LIST_HEADER_HEIGHT,
  LIST_ITEM_HEIGHT,
  OVERSCAN_COUNT,
} from "./collapsible.constants";
import {
  SearchInputBox,
  StyledAccordion,
  StyledAccordionSummary,
  StyledChip,
} from "./collapsible.styles";

export type CollapsibleItem = {
  primaryText: string;
  secondaryText?: string;
  rightAdornment?: JSX.Element;
  key: string;
  checked: boolean;
  onChange: (c: boolean) => void;
};

type CollapsibleProps = {
  headerText: string;
  notificationCount: number;
  items: Array<CollapsibleItem>;
  search?: SearchInputProps;
};

const useCollapsible = (props: CollapsibleProps) => {
  const itemCount = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => props.items.length + 1),
    O.getOrElse(() => props.items.length)
  );

  const _gridHeight = props.items.length * LIST_ITEM_HEIGHT;
  const gridHeight = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => _gridHeight + LIST_HEADER_HEIGHT),
    O.getOrElse(() => _gridHeight)
  );

  const shouldHandleSearch = (index: number) =>
    index === 0 && !isNil(props.search);

  const getItemSize = (index: number) =>
    shouldHandleSearch(index) ? LIST_HEADER_HEIGHT : LIST_ITEM_HEIGHT;

  const getItemIndex = (index: number) =>
    isNil(props.search) ? index : index - 1;

  return {
    itemCount,
    gridHeight,
    shouldHandleSearch,
    getItemSize,
    getItemIndex,
  };
};

export const Collapsible = (props: CollapsibleProps) => {
  const state = useCollapsible(props);

  return (
    <StyledAccordion square>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Text fontSize={FontSize.Size2} fontWeight={FontWeight.Weight4}>
          {props.headerText}
        </Text>
        <StyledChip label={props.notificationCount} />
      </StyledAccordionSummary>
      <VariableSizeList
        height={state.gridHeight}
        itemCount={state.itemCount}
        itemSize={state.getItemSize}
        width="100%"
        overscanCount={OVERSCAN_COUNT}
      >
        {({ index, style }) =>
          state.shouldHandleSearch(index)
            ? pipe(
                props.search,
                O.fromNullable,
                O.map((s) => (
                  <SearchInputBox style={style}>
                    <SearchInput value={s.value} onChange={s.onChange} />
                  </SearchInputBox>
                )),
                O.toNullable
              )
            : pipe(
                props.items,
                A.lookup(state.getItemIndex(index)),
                O.map((i) => <CollapsibleListItem item={i} style={style} />),
                O.toNullable
              )
        }
      </VariableSizeList>
    </StyledAccordion>
  );
};
