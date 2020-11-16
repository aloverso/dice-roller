import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import { ApiClient } from "./ApiClient";
import { Router } from "@reach/router";
import { About } from "./About";
import { History } from "./History";

const apiClient = ApiClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App default path="/" client={apiClient} />
      <History path="/history" client={apiClient} />
      <About path="/about" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
