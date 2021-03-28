import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import { Monitor } from "./monitor/Monitor";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Monitor />
      </div>
    </StylesProvider>
  );
}

export default App;
