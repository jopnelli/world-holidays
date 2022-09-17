import React from "react";
import { HolidayType } from "../HolidayTable/HolidayTable.types";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import {
  colourStyles,
  HolidayTypeSelectFieldWrapper,
} from "./HolidayTypeSelectField.styled";
import { holidayTypeOptions } from "./HolidayTypeSelectField.constants";

export function HolidayTypeSelectField({
  setSelectedType,
}: {
  setSelectedType: Dispatch<SetStateAction<HolidayType[]>>;
}) {
  return (
    <HolidayTypeSelectFieldWrapper>
      <Select
        isMulti
        closeMenuOnSelect={false}
        styles={colourStyles}
        placeholder="Select holiday type..."
        options={holidayTypeOptions}
        onChange={(newValue) => {
          console.log(newValue);
          setSelectedType(newValue as HolidayType[]);
        }}
      />
    </HolidayTypeSelectFieldWrapper>
  );
}
