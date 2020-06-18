import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";

let app;
ReactDOM.render(
  <App
    ref={(inst) => {
      app = inst;
    }}
  />,
  document.getElementById("root")
);

window.banner = function (instruction) {
  if (
    instruction === "open" ||
    instruction === "close" ||
    instruction === "toggle"
  ) {
    app.banner(instruction);
  } else {
    console.error();
  }
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
