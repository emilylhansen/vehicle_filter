import { css } from "styled-components";
import { isNil } from "../utils";
import { Color, FontSize, FontWeight, styled } from "./styles";

type TextProps = {
  fontWeight: FontWeight;
  fontSize: FontSize;
  color?: Color;
  margin?: string;
};

export const Text = styled.span<TextProps>`
  ${({ fontWeight, fontSize, color, margin }) => {
    return css`
      display: inline-flex;
      align-items: center;
      font-weight: ${fontWeight};
      font-size: ${fontSize};

      ${!isNil(color) &&
      css`
        color: ${color};
      `}
      ${!isNil(margin) &&
      css`
        margin: ${margin};
      `}
    `;
  }}
`;
