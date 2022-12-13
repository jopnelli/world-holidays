import React from "react";
import { useQuery } from "react-query";
import { holidayTypeOptions } from "../HolidayTypeSelectField/HolidayTypeSelectField.constants";
import { SystemMessage } from "../SystemMessage/SystemMessage";
import { SystemMessageType } from "../SystemMessage/SystemMessage.types";
import {
  MILLISECONDS_IN_FIVE_MINUTES,
  TABLE_HEADERS,
} from "./HolidayTable.constants";
import {
  currentYear,
  getFilteredHolidays,
  removeDuplicateByName,
} from "./HolidayTable.helpers";
import {
  HolidayTypeStyled,
  HolidayTypeTableCell,
  LoadingStateSkeleton,
  HolidayTableStyled,
} from "./HolidayTable.styled";
import { HolidayItem, HolidayType } from "./HolidayTable.types";

export const fetchHolidays = async ({
  apiKey,
  country,
  year,
}: {
  apiKey: string;
  country: string;
  year: string;
}) => {
  const res = await fetch(
    `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`
  );
  const data = await res.json();
  const removedDuplicateHolidays = removeDuplicateByName(
    data.response.holidays
  );
  return removedDuplicateHolidays as HolidayItem[];
};

export function HolidayTable({
  country,
  holidayTypeFilter,
  apiKey,
}: {
  country: string;
  holidayTypeFilter: HolidayType[];
  apiKey: string;
}) {
  const { isLoading, isError, data } = useQuery(
    ["holidays", apiKey, country, currentYear],
    () => fetchHolidays({ apiKey, country, year: currentYear }),
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
            {TABLE_HEADERS.map((h) => {
              return <th key={h}>{h}</th>;
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
