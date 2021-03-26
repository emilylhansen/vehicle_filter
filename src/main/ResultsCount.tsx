import Chip from "@material-ui/core/Chip";
import { styled } from "../design/styles";
import { Color, FontSize } from "../design/styles";

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
