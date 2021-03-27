import Chip from "@material-ui/core/Chip";
import { Color, FontSize } from "../../design/styles";
import styled from "styled-components";

const StyledChip = styled(Chip)`
  position: absolute;
  bottom: 16px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${Color.White};
  font-size: ${FontSize.Size4};
  height: 24px;
`;

export const ResultsCount = ({ count }: { count: number }) => (
  <StyledChip label={`${count} Results Found`} />
);
