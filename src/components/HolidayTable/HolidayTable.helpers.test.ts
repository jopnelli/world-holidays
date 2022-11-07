import {
  getFilteredHolidays,
  removeDuplicateByName,
} from "./HolidayTable.helpers";
import { HolidayItem } from "./HolidayTable.types";

const dummyHolidayData: HolidayItem[] = [
  {
    name: "Easter Sunday",
    description: "",
    country: {
      id: "de",
      name: "Germany",
    },
    date: {
      iso: "2022-04-17",
      datetime: {
        year: 2022,
        month: 4,
        day: 17,
      },
    },
    type: ["Christian"],
    urlid: "germany/easter",
    locations: "All except BB",
    states: [],
  },
  {
    name: "Easter Sunday",
    description: "",
    country: {
      id: "de",
      name: "Germany",
    },
    date: {
      iso: "2022-04-17",
      datetime: {
        year: 2022,
        month: 4,
        day: 17,
      },
    },
    type: ["Christian"],
    urlid: "germany/easter",
    locations: "BB",
    states: [],
  },
  {
    name: "International Women's Day",
    description: "",
    country: {
      id: "de",
      name: "Germany",
    },
    date: {
      iso: "2022-03-08",
      datetime: {
        year: 2022,
        month: 3,
        day: 8,
      },
    },
    type: ["Observance"],
    urlid: "germany/women-day",
    locations: "All except B",
    states: [],
  },
];

const observanceFilter = {
  value: [
    "Observance",
    "Season",
    "Clock change/Daylight Saving Time",
    "Half-day holiday",
  ],
  label: "Observance",
  color: "#b2d4ff",
};

const religiousFilter = {
  value: ["Religious"],
  label: "Religious",
  color: "#c0b6f3",
};

// arrange act assert
describe("removeDuplicateByName()", () => {
  it("should remove duplicates", () => {
    const result = removeDuplicateByName([
      { name: "a" },
      { name: "b" },
      { name: "a" },
    ]);
    expect(result.length).toBe(2);
    expect(result).toEqual([{ name: "a" }, { name: "b" }]);
  });
});

// avoid code outside the it as much as possible
describe("getFilteredHolidays()", () => {
  it("should return religious type holiday", () => {
    const filterReligiousResult = getFilteredHolidays(dummyHolidayData, [
      religiousFilter,
    ]);
    expect(filterReligiousResult.length).toBe(2);
  });

  it("should return observance type holiday", () => {
    const filterObservanceResult = getFilteredHolidays(dummyHolidayData, [
      observanceFilter,
    ]);
    expect(filterObservanceResult.length).toBe(1);
  });
});
