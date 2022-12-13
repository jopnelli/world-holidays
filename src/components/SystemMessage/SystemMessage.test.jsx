import React from "react";
import { render, screen } from "@testing-library/react";
import { SystemMessage } from "./SystemMessage";
import { SystemMessageType } from "./SystemMessage.types";
import "@testing-library/jest-dom";

test("should render correct system message", () => {
  render(<SystemMessage type={SystemMessageType.COUNTRY_EMPTY} />);
  const titleElement = screen.getByText(/Welcome!/);
  expect(titleElement).toBeInTheDocument();
});
