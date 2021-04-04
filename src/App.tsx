import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { getThemeObject } from "./api/api.selectors";
import "./App.css";
import { GlobalStyle } from "./design/theme";
import { Monitor } from "./monitor/Monitor";

function App() {
  const theme = useSelector(getThemeObject);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Monitor />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
