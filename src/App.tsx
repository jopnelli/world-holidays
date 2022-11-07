import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { HolidayTable } from "./components/HolidayTable/HolidayTable";
import { CountryInputField } from "./components/CountryInputField/CountryInputField";
import { HolidayType } from "./components/HolidayTable/HolidayTable.types";
import { HolidayTypeSelectField } from "./components/HolidayTypeSelectField/HolidayTypeSelectField";
import { ApiKeyInputField } from "./components/ApiKeyInputField/ApiKeyInputField";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [selectedHolidayType, setSelectedHolidayType] = useState<HolidayType[]>(
    []
  );
  const [searchCountryCode, setSearchCountryCode] = useState("");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Container>
        <HeaderStyled>
          <h1>Holidays across the world</h1>

          <HolidayTableControlsWrapper>
            <CountryInputField
              onChange={(input) => setSearchCountryCode(input)}
            />

            <HolidayTypeSelectField
              onChange={(input) => setSelectedHolidayType(input)}
            />

            {/* <ThemeSwitchButton /> */}
          </HolidayTableControlsWrapper>
        </HeaderStyled>

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
      </Container>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: 100%;
  padding: 30px;
  gap: 20px;
`;

const HolidayTableControlsWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const HeaderStyled = styled.div``;
