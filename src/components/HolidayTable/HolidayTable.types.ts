export interface HolidayItem {
  name: string;
  description: string;
  country: { id: string; name: string };
  date: { iso: string; datetime: { year: number; month: number; day: number } };
  type: string[];
  urlid: string;
  locations: string;
  states: string | { [key: string]: string | number }[];
}

export type HolidayType = {
  value: string[];
  label: string;
  color: string;
};
