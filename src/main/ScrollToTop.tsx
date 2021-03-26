import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { styled, Color } from "../design/styles";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${Color.Secondary};
  background-color: ${Color.Primary};
`;

export const ScrollToTop = () => (
  <StyledIconButton>
    <ArrowUpwardIcon />
  </StyledIconButton>
);
