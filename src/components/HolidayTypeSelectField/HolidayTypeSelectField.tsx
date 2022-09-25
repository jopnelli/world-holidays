import React from "react";
import { HolidayType } from "../HolidayTable/HolidayTable.types";
import Select from "react-select";
import { colourStyles, Wrapper } from "./HolidayTypeSelectField.styled";
import { holidayTypeOptions } from "./HolidayTypeSelectField.constants";

export function HolidayTypeSelectField({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<HolidayType[]>>;
}) {
  return (
    <Wrapper>
      <label htmlFor="holiday-type-select" className="sr-only">
        Holiday Type Select Field
      </label>
      <Select
        isMulti
        id="holiday-type-select"
        closeMenuOnSelect={false}
        styles={colourStyles}
        placeholder="Select holiday type..."
        options={holidayTypeOptions}
        onChange={(newValue) => onChange(newValue as HolidayType[])}
      />
    </Wrapper>
  );
}
