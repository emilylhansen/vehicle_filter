import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import { default as MuiListItem } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import React from "react";
import { VariableSizeList } from "react-window";
import { Color, styled, FontSize, FontWeight } from "./styles";
import { SearchInput } from "./SearchInput";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { isNil } from "../utils";
import { Chip } from "../design/Chip";

const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  margin: 0 !important;

  .MuiAccordionSummary-root.Mui-expanded {
    height: 48px;
    min-height: 48px;
  }

  ::before {
    height: 0;
  }
`;

const StyledChip = styled(Chip)`
  margin-left: 8px;
`;

const StyledListItem = styled(MuiListItem)`
  .MuiListItemIcon-root {
    min-width: 0;
  }

  .MuiListItem-gutters {
    padding-left: 0;
    padding-right: 8px;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  display: flex;
  align-items: center;
`;

const SearchInputBox = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export type CollapsibleListItem = {
  primaryText: string;
  secondaryText?: string;
  rightAdornment?: JSX.Element;
  key: string;
};

type CollapsibleProps = {
  headerText: string;
  notificationCount: number;
  items: Array<CollapsibleListItem>;
  search?: boolean;
};

const ListItem = ({
  item,
  style,
}: {
  item: CollapsibleListItem;
  style: React.CSSProperties;
}) => (
  <StyledListItem style={style} key={item.key} role={undefined} dense button>
    <ListItemIcon>
      <Checkbox tabIndex={-1} disableRipple />
    </ListItemIcon>
    <ListItemText primary={item.primaryText} secondary={item.secondaryText} />
    {item.rightAdornment}
  </StyledListItem>
);

export const Collapsible = (props: CollapsibleProps) => {
  const itemCount = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => props.items.length + 1),
    O.getOrElse(() => props.items.length)
  );

  const _height = props.items.length * 48;
  const height = pipe(
    props.search,
    O.fromNullable,
    O.map((_) => _height + 40),
    O.getOrElse(() => _height)
  );

  return (
    <StyledAccordion square>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Text fontSize={FontSize.Size2} fontWeight={FontWeight.Weight4}>
          {props.headerText}
        </Text>
        <StyledChip label={props.notificationCount} />
      </StyledAccordionSummary>
      <VariableSizeList
        height={height}
        itemCount={itemCount}
        itemSize={(i) => (i === 0 && !isNil(props.search) ? 40 : 48)}
        width={"100%"}
        overscanCount={5}
      >
        {({ index, style }) =>
          index === 0 && !isNil(props.search) ? (
            <SearchInputBox style={style}>
              <SearchInput />
            </SearchInputBox>
          ) : (
            pipe(
              props.items,
              A.lookup(isNil(props.search) ? index : index - 1),
              O.map((i) => <ListItem item={i} style={style} />),
              O.toNullable
            )
          )
        }
      </VariableSizeList>
    </StyledAccordion>
  );
};
