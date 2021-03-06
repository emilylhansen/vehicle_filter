import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { withTheme } from "styled-components";
import { O, pipe } from "../../utils/fp-ts-exports";
import { SearchInput, SearchInputProps } from "../SearchInput";
import { FontSize, FontWeight } from "../styles";
import { Text } from "../Text";
import { Theme } from "../theme";
import {
  SearchInputBox,
  StyledAccordion,
  StyledAccordionSummary,
  StyledChip,
} from "./collapsible.styles";

type CollapsibleProps = React.PropsWithChildren<{
  headerText: string;
  notificationCount?: number;
  search?: SearchInputProps;
  headerIconLeft?: JSX.Element;
  theme: Theme;
}>;

export const Collapsible = withTheme((props: CollapsibleProps) => (
  <StyledAccordion square data-cy="collapsible">
    <StyledAccordionSummary
      expandIcon={<ExpandMoreIcon />}
      data-cy="collapsible-header"
    >
      {props.headerIconLeft}
      <Text
        fontSize={FontSize.Size2}
        fontWeight={FontWeight.Weight4}
        color={props.theme.color1}
      >
        {props.headerText}
      </Text>
      {pipe(
        props.notificationCount,
        O.fromNullable,
        O.map((nc) => <StyledChip label={nc} />),
        O.toNullable
      )}
    </StyledAccordionSummary>
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
    {props.children}
  </StyledAccordion>
));
