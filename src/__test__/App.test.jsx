import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import { dummyHolidayData } from "../components/HolidayTable/__test__/dummyHolidayData";

describe("App", () => {
  it("should render a system message on missing api key", async () => {
    render(<App />);
    const countryInputElement = screen.getByLabelText("Country Input Field");
    fireEvent.change(countryInputElement, { target: { value: "France" } });
    // todo
    await waitFor(() => {
      const systemMessageElement = screen.getByText(
        "Please enter your API Key below."
      );
      expect(systemMessageElement).toBeInTheDocument();
    });
  });

  it("should render the holiday table on country and filter input", () => {
    localStorage.setItem("apiKey", "12345");

    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ response: { holidays: dummyHolidayData } }),
        })
      )
    );
    // todo consider dummyHolidayData
    // this test gets complex - how to structure it?

    render(<App />);
    const countryInputElement = screen.getByLabelText("Country Input Field");
    const filterSelectElement = screen.getByText("Select holiday type...");
    fireEvent.change(countryInputElement, { target: { value: "France" } });
    fireEvent.change(filterSelectElement, {
      target: [
        {
          value: ["National holiday"],
          label: "National",
          color: "#79f2c0",
        },
      ],
    });
  });
});

// Test that "Please enter your API Key below." is shown when searching without an API key.
// Test that searching "France" + "National" calls the (mocked) API and displays its result in the table.
