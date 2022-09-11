export interface HolidayItem {
    name: string,
    description: string,
    country: {id: string, name: string},
    date: {iso: string, datetime: {year: number, month: number, day: number}},
    type: string[],
    urlid: string,
    locations: string,
    states: string | {[key: string]: string | number}[]
}

export interface CountryItem {
    country_name: string,
    "iso-3166": string,
    total_holidays: number,
    supported_languages: number,
    uuid: string
}

export type HolidayType = {
    value: string[],
    label: string,
    color: string
}

export enum SystemMessageType {
    EMPTY = "EMPTY",
    ERROR = "ERROR",
    LOADING = "LOADING"
}
