import React from "react";
import { HolidayTable } from "./components/HolidayTable/HolidayTable";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { useState } from "react";
import { CountryInputField } from "./components/CountryInputField/CountryInputField";
import { HolidayType } from "./components/HolidayTable/HolidayTable.types";
import { HolidayTypeSelectField } from "./components/HolidayTypeSelectField/HolidayTypeSelectField";
import { ApiKeyInputField } from "./components/ApiKeyInputField/ApiKeyInputField";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeSwitchButton } from "./components/ThemeSwitchButton/ThemeSwitchButton";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [selectedHolidayType, setSelectedHolidayType] = useState<HolidayType[]>(
    []
  );
  const [searchCountryCode, setSearchCountryCode] = useState("");

  const queryClient = new QueryClient();

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <HeaderStyled>
          <h1>Holidays across the world</h1>

          <HolidayTableControlsWrapper>
            <CountryInputField
              onChange={(input) => setSearchCountryCode(input)}
            />

            <HolidayTypeSelectField
              onChange={(input) => setSelectedHolidayType(input)}
            />

            {/*<ThemeSwitchButton />*/}
          </HolidayTableControlsWrapper>
        </HeaderStyled>

        <ReactQueryDevtools initialIsOpen={false} />
        <HolidayTable
          country={searchCountryCode}
          holidayTypeFilter={selectedHolidayType}
          apiKey={apiKey}
        />

        <ApiKeyInputField
          apiKey={apiKey}
          onChange={(input) => setApiKey(input)}
          isMissing={!!searchCountryCode && !apiKey}
        />
      </QueryClientProvider>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
`;

const HolidayTableControlsWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const HeaderStyled = styled.div`
  height: 10%;
`;
