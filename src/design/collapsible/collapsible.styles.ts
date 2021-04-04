import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { styled } from "../../design/design.helpers";
import { Chip } from "../Chip";

export const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  margin: 0 !important;
  background-color: ${({ theme }) => theme.background1};

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

export const StyledAccordionSummary = styled(AccordionSummary)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background1};

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.color1};
  }

  .MuiAccordionSummary-content {
    align-items: center;
  }
`;

export const SearchInputBox = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin-bottom: 8px;
`;
