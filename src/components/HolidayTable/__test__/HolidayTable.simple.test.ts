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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

// todo fix
// describe("manually mocking fetch with global.fetch", () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ response: { holidays: dummyHolidayData } }),
//     })
//   ) as jest.Mock;
//
//   beforeEach(() => {
//     fetch.mockClear();
//   });
//
//   it("should fetch holidays", async () => {
//     const holidayData = await fetchHolidays({
//       apiKey: "12345",
//       country: "de",
//       year: "2022",
//     });
//     expect(holidayData).toEqual(dummyHolidayData);
//   });
// });
