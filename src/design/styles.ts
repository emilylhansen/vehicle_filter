import { Theme, createMuiTheme } from "@material-ui/core/styles";
import { default as ScStyled, ThemedStyledInterface } from "styled-components";

export const styled = ScStyled as ThemedStyledInterface<Theme>;

export enum Color {
  Primary = "#3728B1",
  Secondary = "#FE845F",
  White = "#fff",
  Gray1 = "#313137",
  Gray2 = "#89888C",
  Gray3 = "#B1B1B1",
  Gray4 = "#F8F8F8",
  Connected = "#28A744",
  Disconnected = "#D73949",
}

export enum FontSize {
  Size1 = "1rem",
  Size2 = "0.85rem",
  Size3 = "0.75rem",
  Size4 = "0.70rem",
  Size5 = "0.65rem",
  Size6 = "0.6rem",
}

export enum FontWeight {
  Weight2 = 200,
  Weight3 = 300,
  Weight4 = 400,
  Weight5 = 500,
  Weight6 = 600,
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {}
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {}
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: Color.Primary,
      contrastText: "#1876D1",
    },
    secondary: {
      main: Color.Secondary,
      contrastText: "#1876D1",
    },
    error: {
      main: Color.Disconnected,
    },
    success: { main: Color.Connected },
  },
});
