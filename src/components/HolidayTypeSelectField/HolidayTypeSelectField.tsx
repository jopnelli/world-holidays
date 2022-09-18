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
      <Select
        isMulti
        closeMenuOnSelect={false}
        styles={colourStyles}
        placeholder="Select holiday type..."
        options={holidayTypeOptions}
        onChange={(newValue) => onChange(newValue as HolidayType[])}
      />
    </Wrapper>
  );
}
