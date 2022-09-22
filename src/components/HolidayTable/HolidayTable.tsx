import React from "react";
import { useQuery } from "react-query";
import { SystemMessageType } from "../SystemMessage/SystemMessage.types";
import { SystemMessage } from "../SystemMessage/SystemMessage";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";
import {
  HolidayTypeStyled,
  HolidayTypeTableCell,
  LoadingStateSkeleton,
  HolidayTableStyled,
} from "./HolidayTable.styled";
import { HolidayType } from "./HolidayTable.types";
import {
  currentYear,
  getFilteredHolidays,
  removeDuplicateHolidays,
} from "./HolidayTable.helpers";
import {
  MILLISECONDS_IN_FIVE_MINUTES,
  TABLE_HEADERS,
} from "./HolidayTable.constants";

export function HolidayTable({
  country,
  holidayTypeFilter,
  apiKey,
}: {
  country: string;
  holidayTypeFilter: HolidayType[];
  apiKey: string;
}) {
  const fetchHolidays = async () => {
    const res = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${currentYear}`
    );
    const data = await res.json();
    return removeDuplicateHolidays(data.response.holidays);
  };

  const { isLoading, isError, data } = useQuery(
    ["holidays", apiKey, country, currentYear],
    fetchHolidays,
    {
      select: (data) => getFilteredHolidays(data, holidayTypeFilter),
      staleTime: MILLISECONDS_IN_FIVE_MINUTES,
      enabled: !!country && !!apiKey,
    }
  );

  if (!country) return <SystemMessage type={SystemMessageType.COUNTRY_EMPTY} />;

  if (!apiKey) return <SystemMessage type={SystemMessageType.API} />;

  if (isError) return <SystemMessage type={SystemMessageType.ERROR} />;

  return (
    <HolidayTableStyled>
      <table>
        <thead>
          <tr>
            {TABLE_HEADERS.map((h, i) => {
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
    </HolidayTableStyled>
  );
}
