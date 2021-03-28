import {
  ChipProps as MuiChipProps,
  default as MuiChip,
} from "@material-ui/core/Chip";
import styled from "styled-components";
import { Color, FontSize, FontWeight } from "../design/styles";

const StyledChip = styled(MuiChip)`
  background-color: ${Color.Primary};
  height: 24px;
  font-weight: ${FontWeight.Weight4};
  font-size: ${FontSize.Size3};
  color: ${Color.White};
  letter-spacing: 1px;
`;

export const Chip = (props: MuiChipProps) => <StyledChip {...props} />;
