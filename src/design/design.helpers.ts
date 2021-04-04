import { default as ScStyled, ThemedStyledInterface } from "styled-components";
import { Color } from "./styles";
import { Theme } from "./theme";

export const styled = ScStyled as ThemedStyledInterface<Theme>;

export const colorToRbga = ({
  color,
  opacity,
}: {
  color: Color;
  opacity: number;
}): string => {
  switch (color) {
    case Color.Primary:
      return `rgba(55, 40, 177, ${opacity})`;
    case Color.Secondary:
      return `rgba(254, 132, 95, ${opacity})`;
    default:
      return "";
  }
};
