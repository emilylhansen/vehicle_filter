import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { default as MuiListItem } from "@material-ui/core/ListItem";
import styled from "styled-components";
import { Chip } from "../Chip";
import { FontSize } from "../styles";

export const StyledAccordion = styled(Accordion)`
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

export const StyledChip = styled(Chip)`
  margin-left: 8px;
`;

export const StyledListItem = styled(MuiListItem)`
  .MuiListItemIcon-root {
    min-width: 0;
  }

  .MuiListItem-gutters {
    padding-left: 0;
    padding-right: 8px;
  }

  .MuiListItemText-primary,
  .MuiListItemText-secondary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiListItemText-primary {
    font-size: ${FontSize.Size3};
  }

  .MuiListItemText-secondary {
    font-size: ${FontSize.Size5};
  }

  .MuiListItemText-root {
    flex: unset;
    margin-right: 8px;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  display: flex;
  align-items: center;
`;

export const SearchInputBox = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin-bottom: 8px;
`;
