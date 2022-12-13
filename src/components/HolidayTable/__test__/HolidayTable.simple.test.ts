import { fetchHolidays } from "../HolidayTable";
import { dummyHolidayData } from "./dummyHolidayData";

describe("manually mocking fetch with jest.spyOn", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ response: { holidays: dummyHolidayData } }),
        })
      ) as jest.Mock
    );
  });

  it("fetches holidays", async () => {
    const holidayData = await fetchHolidays({
      apiKey: "12345",
      country: "de",
      year: "2022",
    });
    expect(holidayData).toEqual(dummyHolidayData);
    expect(fetch).toHaveBeenCalledWith(
      "https://calendarific.com/api/v2/holidays?api_key=12345&country=de&year=2022"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
