import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./shared/theme.css";

// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
