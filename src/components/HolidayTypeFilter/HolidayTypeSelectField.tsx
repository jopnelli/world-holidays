import {HolidayType} from "../HolidayTable/HolidayTable.types";
import Select, {StylesConfig} from "react-select";
import {Dispatch, SetStateAction} from "react";
import chroma from "chroma-js";
import {HolidayTypeSelectFieldWrapper} from "./HolidayTypeSelectField.styled";

export function HolidayTypeSelectField({setSelectedType}: { setSelectedType: Dispatch<SetStateAction<HolidayType[]>> }){
	const colourStyles: StylesConfig<HolidayType> = {
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
				backgroundColor: isFocused
					? color.css()
					: undefined,
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

	return (<HolidayTypeSelectFieldWrapper>
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
	</HolidayTypeSelectFieldWrapper>);
}

export const holidayTypeOptions = [
	{
		value: ["National holiday"],
		label: "National",
		color: "#79f2c0"
	},
	{
		value: ["Observance", "Season", "Clock change/Daylight Saving Time", "Half-day holiday"],
		label: "Observance",
		color: "#b2d4ff"
	},
	{
		value: ["Common local holiday", "Local holiday"],
		label: "Local",
		color: "#ffbdad"
	},
	{
		value: ["Religious"],
		label: "Religious",
		color: "#c0b6f3"
	}
];