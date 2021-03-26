import React from "react";
import "./App.css";
import { Monitor } from "./Monitor";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
// import { theme } from "./design/styles";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <StylesProvider injectFirst>
      {/* <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}> */}
      <div className="App">
        <Monitor />
      </div>
      {/* </ThemeProvider>
      </MuiThemeProvider> */}
    </StylesProvider>
  );
}

export default App;
