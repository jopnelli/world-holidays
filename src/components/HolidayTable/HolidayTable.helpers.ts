import { HolidayItem, HolidayType } from "./HolidayTable.types";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";

export function removeDuplicateHolidays(holidays: HolidayItem[]) {
  return holidays.filter(
    (h, index, holidays) =>
      index === holidays.findIndex((h2) => h2.name === h.name)
  );
}

export function getFilteredHolidays(
  holidayData: HolidayItem[],
  holidayFilter: HolidayType[]
) {
  console.log(holidayFilter);
  const holidayTypeFilterValues = holidayFilter.flatMap((t) => t.value);

  if (!holidayFilter.length) return holidayData;

  // holiday type values returned by the api don't specifically include the category I filter for here
  // religious would eg be "muslim", "hebrew", "christian" or "buddhist"
  // so when we filter for "Religious"
  if (holidayTypeFilterValues.includes("Religious")) {
    const nonReligiousHolidays = holidayTypeOptions
      .filter((h) => h.label !== "Religious")
      // we take the hard-coded values for the other categories (there are less options)
      .flatMap((h) => h.value);

    // and we're assuming a holiday type that doesn't fall under any of those values is religious
    return holidayData.filter((h) =>
      h.type.some((t) => !nonReligiousHolidays.includes(t))
    );
  }

  return holidayData.filter((h) =>
    h.type.some((t) => holidayTypeFilterValues.includes(t))
  );
}

export const currentYear = new Date().getFullYear().toString();
