import { SvgIcon, SvgIconProps } from "@material-ui/core";
import styled, { css } from "styled-components";
import { O, pipe } from "../utils/fp-ts-exports";
import { Color } from "./styles";
import { isNotNil } from "../utils/utils";

const IconBox = styled.div<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ fontSize, color, margin }) =>
    css`
      width: ${fontSize}px;
      height: ${fontSize}px;
      ${isNotNil(margin) &&
      css`
        margin: ${margin};
      `}

      .MuiSvgIcon-root {
        font-size: ${fontSize}px;
        ${isNotNil(color) &&
        css`
          color: ${color};
        `}
      }
    `};
`;

type InjectedProps = { fontSize?: number; color?: Color; margin?: string };
export type IconProps = Omit<SvgIconProps, "fontSize" | "color"> &
  InjectedProps;

export const Icon = ({ fontSize, color, margin, ...rest }: IconProps) => {
  const _fontSize = pipe(
    fontSize,
    O.fromNullable,
    O.getOrElse(() => 24)
  );

  return (
    <IconBox fontSize={_fontSize} color={color} margin={margin}>
      <SvgIcon {...rest}>{rest.children}</SvgIcon>
    </IconBox>
  );
};
