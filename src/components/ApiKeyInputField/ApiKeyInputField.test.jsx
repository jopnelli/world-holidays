import React from "react";
import { render, screen } from "@testing-library/react";
import { ApiKeyInputField } from "./ApiKeyInputField";
import "@testing-library/jest-dom";

describe("test api key input", () => {
  it("should set apiKey prop as defaultValue for input", () => {
    const mockApiKey = "12345";
    render(
      <ApiKeyInputField
        apiKey={mockApiKey}
        onChange={() => () => null}
        isMissing={false}
      />
    );

    // todo check typing
    const inputElement = screen.getByLabelText("Api Key Input Field");
    expect(inputElement.value).toBe(mockApiKey);
  });

  // it("should call onChange with apiKey from localStorage", () => {
  //
  // });

  // it("should handle onChange as inputfield", () => {
  //
  // });

  // it("should highlight inputfield if apiKey is missing", () => {
  //
  // });
});
