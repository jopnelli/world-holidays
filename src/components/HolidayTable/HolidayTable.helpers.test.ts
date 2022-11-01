import {
  getFilteredHolidays,
  removeDuplicateHolidays,
} from "./HolidayTable.helpers";
import { HolidayItem } from "./HolidayTable.types";

const duplicateHolidays: HolidayItem[] = [
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

describe("removeDuplicateHolidays", () => {
  const result = removeDuplicateHolidays(duplicateHolidays);

  it("should remove duplicates", () => {
    expect(result.length).toBe(2);
  });
});

describe("getFilteredHolidays", () => {
  describe("filterReligiousHolidays", () => {
    const filterReligiousResult = getFilteredHolidays(duplicateHolidays, [
      religiousFilter,
    ]);

    it("should return religious type holiday", () => {
      expect(filterReligiousResult.length).toBe(2);
    });
  });

  describe("filterObservanceHolidays", () => {
    const filterObservanceResult = getFilteredHolidays(duplicateHolidays, [
      observanceFilter,
    ]);

    it("should return observance type holiday", () => {
      expect(filterObservanceResult.length).toBe(1);
    });
  });
});
