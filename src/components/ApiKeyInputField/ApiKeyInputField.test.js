import { ApiKeyInputField } from "./ApiKeyInputField";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("test api key input", () => {
  const mockApiKey = "12345";

  test("data is added into local storage", () => {
    localStorage.setItem("apiKey", mockApiKey);
    expect(localStorage.getItem("apiKey")).toEqual(mockApiKey);
  });

  test("should pre fill api key input field from local storage", () => {
    render(
      <ApiKeyInputField
        apiKey={mockApiKey}
        onChange={() => () => null}
        isMissing={false}
      />
    );
    const inputElement = screen.getByTestId("api-key-input");
    expect(inputElement.value).toBe(mockApiKey);
  });

  // test("should highlight api key field on missing input", () => {
  //
  // });
});

// apiKey from localStorage is set to parent state, and received again as prop to fill defaultValue
