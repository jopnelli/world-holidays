import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  min-height: 50vh;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <PageWrapper>
    <App />
  </PageWrapper>
);
