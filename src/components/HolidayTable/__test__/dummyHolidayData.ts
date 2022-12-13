import { HolidayItem } from "../HolidayTable.types";

export const dummyHolidayData: HolidayItem[] = [
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
