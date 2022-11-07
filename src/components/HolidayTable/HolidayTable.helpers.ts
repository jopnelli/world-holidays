import { HolidayItem, HolidayType } from "./HolidayTable.types";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";

interface Entry {
  name: string;
}

// todo JSDocs
/**
 * given a list of objects remove duplicate items by name key
 * @param entries - list of objects
 * @example
 * [{name: a}, {name: b}, {name: a}]
 *  => [{name: a}, {name: b}]
 */
export function removeDuplicateByName(entries: Entry[]) {
  return entries.filter(
    (e, index, entries) =>
      index === entries.findIndex((e2) => e.name === e2.name)
  );
}

export function getFilteredHolidays(
  holidayData: HolidayItem[],
  holidayFilter: HolidayType[]
) {
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
