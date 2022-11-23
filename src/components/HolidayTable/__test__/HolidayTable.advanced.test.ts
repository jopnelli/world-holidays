import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// todo add
// describe("mocking fetch with jest-fetch-mock", () => {
//   it("fetches holidays", async () => {
//     fetch.mockResponseOnce(
//       JSON.stringify({ response: { holidays: dummyHolidayData } })
//     );
//
//     const holidayData = await fetchHolidays({
//       apiKey: "12345",
//       country: "de",
//       year: "2022",
//     });
//     expect(holidayData).toEqual(dummyHolidayData);
//   });
// });
