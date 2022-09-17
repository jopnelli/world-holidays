import {
  supportedCountries,
  supportedCountryCodes,
  supportedCountryNames,
} from "../../shared/supportedCountries";

export function inputIsValid(input: string) {
  return !(
    (input.length !== 2 && !supportedCountryNames.includes(input)) ||
    (input.length === 2 && !supportedCountryCodes.includes(input))
  );
}

export function findCountryCode(input: string) {
  if (input.length === 2) return input.toLowerCase();
  return supportedCountries.find((c) => c.name === input)!.iso.toLowerCase();
}
