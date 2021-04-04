import { createGlobalStyle } from "styled-components";
import { Color } from "./styles";

export type Theme = {
  background1: Color;
  background2: Color;
  color1: Color;
  color2: Color;
  color3: Color;
};

export const lightTheme: Theme = {
  background1: Color.White,
  background2: Color.Gray6,
  color1: Color.Gray3,
  color2: Color.Gray4,
  color3: Color.Gray5,
};

export const darkTheme: Theme = {
  background1: Color.Gray1,
  background2: Color.Gray2,
  color1: Color.White,
  color2: Color.Gray5,
  color3: Color.Gray6,
};

export enum ThemeEnum {
  Light = "LIGHT",
  Dark = "DARK",
}

export const themesById: Record<ThemeEnum, Theme> = {
  [ThemeEnum.Light]: lightTheme,
  [ThemeEnum.Dark]: darkTheme,
};

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background: ${({ theme }) => theme.background1};
    color: ${({ theme }) => theme.color1};
  }
`;
