import fetch from "jest-fetch-mock";
import { fetchHolidays } from "../HolidayTable";
import { dummyHolidayData } from "./dummyHolidayData";

fetch.enableMocks();

describe("mocking fetch with jest-fetch-mock", () => {
  beforeEach(() => fetch.resetMocks());

  it("fetches holidays", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ response: { holidays: dummyHolidayData } })
    );

    const holidayData = await fetchHolidays({
      apiKey: "12345",
      country: "de",
      year: "2022",
    });
    expect(holidayData).toEqual(dummyHolidayData);
  });
});
