import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { middleware as reduxPackMiddleware } from "redux-pack";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import { rootReducer } from "./api/reducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, reduxPackMiddleware)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
