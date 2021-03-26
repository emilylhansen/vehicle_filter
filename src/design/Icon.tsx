import { SvgIcon, SvgIconProps } from "@material-ui/core";
import styled, { css } from "styled-components";
import { Color } from "./styles";
import { A, R, O, pipe } from "../utils/fp-ts";

const IconBox = styled.div<DefaultInjectedProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ fontSize, color, margin }) =>
    css`
      width: ${fontSize}px;
      height: ${fontSize}px;
      margin: ${margin};

      .MuiSvgIcon-root {
        font-size: ${fontSize}px;
        color: ${color};
      }
    `};
`;

type InjectedProps = { fontSize?: number; color?: Color; margin?: string };
type DefaultInjectedProps = Required<InjectedProps>;
const defaultInjectedProps: DefaultInjectedProps = {
  fontSize: 24,
  color: Color.Gray1,
  margin: "0",
};
export type IconProps = Omit<SvgIconProps, "fontSize" | "color"> &
  InjectedProps;

export const Icon = ({ fontSize, color, margin, ...rest }: IconProps) => {
  const _fontSize = pipe(
    fontSize,
    O.fromNullable,
    O.getOrElse(() => defaultInjectedProps.fontSize)
  );
  const _color = pipe(
    color,
    O.fromNullable,
    O.getOrElse(() => defaultInjectedProps.color)
  );
  const _margin = pipe(
    margin,
    O.fromNullable,
    O.getOrElse(() => defaultInjectedProps.margin)
  );

  return (
    <IconBox fontSize={_fontSize} color={_color} margin={_margin}>
      <SvgIcon {...rest}>{rest.children}</SvgIcon>
    </IconBox>
  );
};
