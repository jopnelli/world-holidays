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

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [selectedHolidayType, setSelectedHolidayType] = useState<HolidayType[]>(
    []
  );
  const [searchCountryCode, setSearchCountryCode] = useState({
    code: "",
    isValid: false,
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <header>
          <h1>Holidays across the world</h1>
        </header>

        <HolidayTableControlsWrapper>
          <CountryInputField setSearchCountry={setSearchCountryCode} />

          <HolidayTypeSelectField setSelectedType={setSelectedHolidayType} />
        </HolidayTableControlsWrapper>

        <ReactQueryDevtools initialIsOpen={false} />
        <HolidayTable
          country={searchCountryCode.code}
          holidayTypeFilter={selectedHolidayType}
          apiKey={apiKey}
          isEnabled={!!apiKey.length && searchCountryCode.isValid}
        />

        <ApiKeyInputField
          apiKey={apiKey}
          setApiKey={setApiKey}
          isMissing={!!searchCountryCode.code && !apiKey}
        />
      </Container>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  padding-bottom: 30px;
  height: 100%;
`;

const HolidayTableControlsWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
`;
