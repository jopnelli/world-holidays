import {useQuery} from "react-query";
import {SystemMessageType} from "../SystemMessage/SystemMessage.types";
import {SystemMessage} from "../SystemMessage/SystemMessage";
import {useEffect, useMemo, useState} from "react";
import {holidayTypeOptions} from "../HolidayTypeFilter/HolidayTypeSelectField";
import {HolidayTypeStyled, HolidayTypeTableCell, LoadingStateSkeleton, TableStyled} from "./HolidayTable.styled";
import {HolidayItem, HolidayType} from "./HolidayTable.types";

const year = new Date().getFullYear().toString();
const headers = ["NAME", "DATE", "DESCRIPTION", "TYPE"];

export function HolidayTable({country, holidayTypeFilter, apiKey}: { country: string, holidayTypeFilter: HolidayType[], apiKey: string }) {
	const [holidayData, setHolidayData] = useState<HolidayItem[]>();

	const fetchHolidays = async () => {
		const res = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`);
		const data = await res.json();
		return removeDuplicateHolidays(data.response.holidays);
	};

	const {status, refetch} = useQuery(["holidays", apiKey, country, year], fetchHolidays, {enabled: false, onSuccess: setHolidayData, staleTime: 600000});

	useEffect(() => {
		refetch();
	}, [country, apiKey, refetch]);

	const filteredHolidays = useMemo(() => {
		if (!holidayData) return [];

		const holidayTypeFilterValues = holidayTypeFilter.flatMap(t => t.value);

		if (!holidayTypeFilter.length) return holidayData;

		if (holidayTypeFilterValues.includes("Religious")) {
			const nonReligiousHolidays = holidayTypeOptions.filter(h => h.label !== "Religious").flatMap(h => h.value);
			return holidayData.filter(h => h.type.some(t => !nonReligiousHolidays.includes(t)));
		}

		return holidayData.filter(h => h.type.some(t => holidayTypeFilterValues.includes(t)));
	}, [holidayData, holidayTypeFilter]);

	if (status === "error") return (
		<SystemMessage
			type={SystemMessageType.ERROR}/>
	);

	if (status === "loading") return (<TableStyled>
		<table>
			<thead>
				<tr>
					{headers.map((h, i) => {
						return (
							<th
								key={i}>
								{h}
							</th>);
					})}
				</tr>
			</thead>
			<tbody>
				{[...Array(5)].map((e, i) => {
					return (
						<tr
							key={i}>
							<td><LoadingStateSkeleton/></td>
							<td><LoadingStateSkeleton/></td>
							<td><LoadingStateSkeleton/></td>
							<td><HolidayTypeTableCell><LoadingStateSkeleton/><LoadingStateSkeleton/></HolidayTypeTableCell></td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</TableStyled>);

	return <>
		{status === "success" && holidayData && <TableStyled>
			<table>
				<thead>
					<tr>
						{headers.map((h, i) => {
							return (
								<th
									key={i}>
									{h}
								</th>);
						})}
					</tr>
				</thead>
				<tbody>
					{filteredHolidays.map((h, i) => {
						const date = new Date(h.date.iso);
						return (
							<tr
								key={i}>
								<td>{h.name}</td>
								<td>{date.toString().substring(4, 10)}</td>
								<td>{h.description}</td>

								<td><HolidayTypeTableCell>{h.type.map((t, i) => {
									const holidayTypeOption = holidayTypeOptions.find(ht => ht.value.includes(t)) || holidayTypeOptions.find(o => o.label === "Religious")!;
									return <HolidayTypeStyled
										key={i}
										color={holidayTypeOption.color}
									>{holidayTypeOption.label}</HolidayTypeStyled>;
								})}</HolidayTypeTableCell></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</TableStyled>}
	</>;
}

function removeDuplicateHolidays(holidays: HolidayItem[]) {
	return holidays.filter((h, index, holidays) =>
		index === holidays.findIndex((h2) => h2.name === h.name));
}

