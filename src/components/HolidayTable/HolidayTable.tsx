import React from "react";
import { useQuery } from "react-query";
import { SystemMessageType } from "../SystemMessage/SystemMessage.types";
import { SystemMessage } from "../SystemMessage/SystemMessage";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";
import {
  HolidayTypeStyled,
  HolidayTypeTableCell,
  LoadingStateSkeleton,
  TableStyled,
} from "./HolidayTable.styled";
import { HolidayType } from "./HolidayTable.types";
import {
  filterHolidays,
  removeDuplicateHolidays,
} from "./HolidayTable.helpers";

const year = new Date().getFullYear().toString();
const headers = ["NAME", "DATE", "DESCRIPTION", "TYPE"];
const STALE_TIME = 1000 * 60 * 5;

export function HolidayTable({
  country,
  holidayTypeFilter,
  apiKey,
  isEnabled,
}: {
  country: string;
  holidayTypeFilter: HolidayType[];
  apiKey: string;
  isEnabled: boolean;
}) {
  const fetchHolidays = async () => {
    const res = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`
    );
    const data = await res.json();
    return removeDuplicateHolidays(data.response.holidays);
  };

  const { isLoading, isError, data } = useQuery(
    ["holidays", apiKey, country, year],
    fetchHolidays,
    {
      select: (data) => filterHolidays(data, holidayTypeFilter),
      staleTime: STALE_TIME,
      enabled: isEnabled,
    }
  );

  if (!country) return <SystemMessage type={SystemMessageType.EMPTY} />;

  if (!apiKey) return <SystemMessage type={SystemMessageType.API} />;

  if (isError) return <SystemMessage type={SystemMessageType.ERROR} />;

  return (
    <TableStyled>
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => {
              return <th key={i}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(5)].map((e, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <LoadingStateSkeleton />
                    </td>
                    <td>
                      <LoadingStateSkeleton />
                    </td>
                    <td>
                      <LoadingStateSkeleton />
                    </td>
                    <td>
                      <HolidayTypeTableCell>
                        <LoadingStateSkeleton />
                        <LoadingStateSkeleton />
                      </HolidayTypeTableCell>
                    </td>
                  </tr>
                );
              })
            : data!.map((h, i) => {
                const date = new Date(h.date.iso);
                return (
                  <tr key={i}>
                    <td>{h.name}</td>
                    <td>{date.toString().substring(4, 10)}</td>
                    <td>{h.description}</td>

                    <td>
                      <HolidayTypeTableCell>
                        {h.type.map((t, i) => {
                          const holidayTypeOption =
                            holidayTypeOptions.find((ht) =>
                              ht.value.includes(t)
                            ) ||
                            holidayTypeOptions.find(
                              (o) => o.label === "Religious"
                            )!;
                          return (
                            <HolidayTypeStyled
                              key={i}
                              $color={holidayTypeOption.color}
                            >
                              {holidayTypeOption.label}
                            </HolidayTypeStyled>
                          );
                        })}
                      </HolidayTypeTableCell>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </TableStyled>
  );
}
