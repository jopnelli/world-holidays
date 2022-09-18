import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import styled from "styled-components";
import "./shared/theme.css";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Wrapper>
    <App />
  </Wrapper>
);
