import {useQuery} from "react-query";
import {HolidayItem, HolidayType, SystemMessageType} from "../types";
import styled, {keyframes} from "styled-components";
import {SystemMessage} from "./SystemMessage";
import {useEffect, useMemo, useState} from "react";
import {holidayTypeOptions} from "./HolidayTypeSelectField";

const year = new Date().getFullYear().toString();
const headers = ["NAME", "DATE", "DESCRIPTION", "TYPE"];

export function HolidayTable({country, holidayTypeFilter, apiKey}: { country: string, holidayTypeFilter: HolidayType[], apiKey: string }) {
	const [holidayData, setHolidayData] = useState<HolidayItem[]>();

	function getHolidays({country, year}: { country: string, year: string }) {
		return useQuery(["holidays"], async () => {
			const res = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`);
			const data = await res.json();
			return removeDuplicateHolidays(data.response.holidays);
		}, {enabled: false, onSuccess: setHolidayData});
	}

	const {status, refetch} = getHolidays({country, year});

	useEffect(() => {
		refetch();
	}, [country, apiKey]);

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

	if (status === "loading") return (<StyledTable>
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
	</StyledTable>);

	return <>
		{status === "success" && holidayData && <StyledTable>
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
									const holidayTypeOption = holidayTypeOptions.find(ht => ht.value.includes(t)) || holidayTypeOptions[3];
									return <StyledHolidayType
										key={i}
										color={holidayTypeOption.color}
									>{holidayTypeOption.label}</StyledHolidayType>;
								})}</HolidayTypeTableCell></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</StyledTable>}
	</>;
}

function removeDuplicateHolidays(holidays: HolidayItem[]) {
	return holidays.filter((h, index, holidays) =>
		index === holidays.findIndex((h2) => h2.name === h.name));
}

const StyledTable = styled.div`
	border: 1px solid #c5cfdc;
	border-radius: 10px;
	
	table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 10px;
		
		font-weight: 400;
		font-size: 0.9rem;
	}
	
	thead, th {
		border-bottom: 1px solid #c5cfdc;
	}
	
	th, td {
		padding: 15px;
		text-align: left;
	}
	
	td:first-child {
		font-weight: 600;
	}
	
	td:nth-child(2) {
		white-space: nowrap;
	}
	
	thead, tr:nth-child(even) {
		background-color: #f9fbfc;
	}

	th:first-child {
		border-top-left-radius: 10px;
	}
	th:last-child {
		border-top-right-radius: 10px;
	}
	tr:last-child td:first-child {
		border-bottom-left-radius: 10px;
	}
	tr:last-child td:last-child {
		border-bottom-right-radius: 10px;
	}
`;

const StyledHolidayType = styled.span<{color: string}>`
	background-color: ${props => props.color};
	padding: 6px;
	border-radius: 3px;
	height: fit-content;
`;

const loadingAnimation = keyframes`
 0% { background-color: #D3D3D3 }
 50% { background-color: #EBECF0; opacity: 1 }
 100% { background-color: #949494; opacity: 0.6; }
`;

const LoadingStateSkeleton = styled.div`
	height: 10px;
	background: grey;
	min-width: 40px;
	animation: ${loadingAnimation} 2s linear infinite alternate;
`;

const HolidayTypeTableCell = styled.div`
	display: flex;
	gap: 10px;
`;