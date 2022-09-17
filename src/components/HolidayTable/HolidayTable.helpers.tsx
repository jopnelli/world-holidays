import { HolidayItem, HolidayType } from "./HolidayTable.types";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";

export function removeDuplicateHolidays(holidays: HolidayItem[]) {
  return holidays.filter(
    (h, index, holidays) =>
      index === holidays.findIndex((h2) => h2.name === h.name)
  );
}

export function filterHolidays(
  holidayData: HolidayItem[],
  holidayFilter: HolidayType[]
) {
  const holidayTypeFilterValues = holidayFilter.flatMap((t) => t.value);

  if (!holidayFilter.length) return holidayData;

  if (holidayTypeFilterValues.includes("Religious")) {
    const nonReligiousHolidays = holidayTypeOptions
      .filter((h) => h.label !== "Religious")
      .flatMap((h) => h.value);
    return holidayData.filter((h) =>
      h.type.some((t) => !nonReligiousHolidays.includes(t))
    );
  }

  return holidayData.filter((h) =>
    h.type.some((t) => holidayTypeFilterValues.includes(t))
  );
}
