import {
  default as MuiChip,
  ChipProps as MuiChipProps,
} from "@material-ui/core/Chip";
import { styled } from "../design/styles";
import { Color, FontSize, FontWeight } from "../design/styles";

const StyledChip = styled(MuiChip)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 24px;
  font-weight: ${FontWeight.Weight4};
  font-size: ${FontSize.Size3};
  color: ${Color.White};
  letter-spacing: 1px;
`;

export const Chip = (props: MuiChipProps) => <StyledChip {...props} />;
