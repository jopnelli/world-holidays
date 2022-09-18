import {
  supportedCountries,
  supportedCountryNames,
} from "../../shared/supportedCountries";

export function inputIsValid(input: string) {
  return supportedCountryNames.includes(input);
}

export function getCountryCode(input: string) {
  return supportedCountries.find((c) => c.name === input)!.iso.toLowerCase();
}
