import styled, { css } from "styled-components";
import { isNotNil } from "../utils/utils";
import { Color, FontSize, FontWeight } from "./styles";

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

      ${isNotNil(color) &&
      css`
        color: ${color};
      `}
      ${isNotNil(margin) &&
      css`
        margin: ${margin};
      `}
    `;
  }}
`;
