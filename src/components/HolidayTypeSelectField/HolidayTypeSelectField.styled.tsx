import styled from "styled-components";
import { StylesConfig } from "react-select";
import { HolidayType } from "../HolidayTable/HolidayTable.types";
import chroma from "chroma-js";

export const Wrapper = styled.div`
  & #react-select-2-placeholder {
    font-size: 14px;
  }
`;

export const colourStyles: StylesConfig<HolidayType> = {
  control: (styles) => {
    return {
      ...styles,
      backgroundColor: "white",
      width: "inherit",
      height: "inherit",
    };
  },
  option: (styles, { data, isFocused }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused ? color.css() : undefined,
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.css(),
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};
