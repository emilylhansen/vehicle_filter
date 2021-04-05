import { default as MuiButton } from "@material-ui/core/Button";
import { css } from "styled-components";
import { styled, colorToRbga } from "./design.helpers";
import { Color, FontSize, FontWeight } from "./styles";

export enum ButtonPropsDisplay {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
}

type ButtonProps = { display: ButtonPropsDisplay };

const getDisplayStyles = (display: ButtonPropsDisplay) => {
  switch (display) {
    case ButtonPropsDisplay.Primary:
      return css`
        background-color: ${Color.Primary} !important;
        color: ${Color.Secondary} !important;
      `;
    case ButtonPropsDisplay.Secondary:
      return css`
        border: 1px solid ${Color.Secondary} !important;
        background-color: ${({ theme }) => theme.background1} !important;
        color: ${Color.Secondary} !important;

        :disabled {
          border: 1px solid
            ${colorToRbga({ color: Color.Secondary, opacity: 0.12 })} !important;

          color: ${colorToRbga({
            color: Color.Secondary,
            opacity: 0.26,
          })} !important;
        }
      `;
  }
};

export const Button = styled(MuiButton)<ButtonProps>`
  border-radius: 20px;
  font-size: ${FontSize.Size2};
  text-transform: capitalize;
  font-weight: ${FontWeight.Weight5};
  height: 32px;

  ${({ display }) => getDisplayStyles(display)}
`;
