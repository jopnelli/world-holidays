import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ApiKeyInputField } from "./ApiKeyInputField";

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

    // todo fix
    // const inputElement = screen.getByRole("textbox", {
    //   name: "api-key-input",
    // });
    const inputElement = screen.getByLabelText("Api Key Input Field");
    expect(inputElement.value).toBe(mockApiKey);
  });

  it("should call onChange with apiKey from localStorage", () => {
    const mockApiKey = "12345";
    localStorage.setItem("apiKey", mockApiKey);
    const onChange = jest.fn();
    render(
      <ApiKeyInputField apiKey={""} onChange={onChange} isMissing={false} />
    );
    expect(onChange).toHaveBeenCalledWith(mockApiKey);
  });

  it("should handle onChange as inputfield", () => {
    const onChange = jest.fn();

    render(
      <ApiKeyInputField
        apiKey={"mockApiKey"}
        onChange={onChange}
        isMissing={false}
      />
    );

    const inputElement = screen.getByLabelText("Api Key Input Field");

    fireEvent.change(inputElement, { target: { value: "12345" } });

    expect(onChange).toHaveBeenCalledWith("12345");
    expect(localStorage.getItem("apiKey")).toEqual("12345");
  });

  // todo add
  // it("should highlight inputfield if apiKey is missing", () => {});
});
