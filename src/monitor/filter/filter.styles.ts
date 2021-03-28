import ListSubheader from "@material-ui/core/ListSubheader";
import styled from "styled-components";
import { Button } from "../../design/Button";
import { Color } from "../../design/styles";

export const FilterBox = styled.div`
  grid-area: filter;
  display: flex;
  flex-flow: column;
  border-right: 1px solid ${Color.Gray4};
  overflow: auto;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-flow: column;
  padding: 16px;
`;

export const ScrollList = styled.div`
  flex: 1;
  overflow: auto;

  > * {
    border-bottom: 1px solid ${Color.Gray4};
  }
`;

export const SearchButton = styled(Button)`
  margin-bottom: 4px;
`;

export const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  align-items: center;
  height: 48px;
  background-color: ${Color.White};
`;
