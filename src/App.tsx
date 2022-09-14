import {HolidayTable} from "./components/HolidayTable/HolidayTable";
import {QueryClient, QueryClientProvider} from "react-query";
import styled from "styled-components";
import {useState} from "react";
import {SearchCountryInputField} from "./components/CountrySearchField/SearchCountryInputField";
import {SystemMessage} from "./components/SystemMessage/SystemMessage";
import {SystemMessageType} from "./components/SystemMessage/SystemMessage.types";
import {HolidayType} from "./components/HolidayTable/HolidayTable.types";
import {HolidayTypeSelectField} from "./components/HolidayTypeFilter/HolidayTypeSelectField";
import {ApiKeyInput} from "./components/ApiKeyInput/ApiKeyInput";

export default function App() {
	const [apiKey, setApiKey] = useState("");
	const [selectedHolidayType, setSelectedHolidayType] = useState<HolidayType[]>([]);
	const [searchCountryCode, setSearchCountryCode] = useState({
		code: "",
		isValid: false
	});

	const queryClient = new QueryClient();

	return (
		<Container>
			<header>
				<h1>
					Holidays across the world
				</h1>
			</header>

			<HolidayTableControlsWrapper>

				<SearchCountryInputField
					setSearchCountry={setSearchCountryCode}/>

				<HolidayTypeSelectField
					setSelectedType={setSelectedHolidayType}/>

			</HolidayTableControlsWrapper>

			{!searchCountryCode.code && <SystemMessage
				type={SystemMessageType.EMPTY}/>}

			{searchCountryCode.code && !apiKey && <SystemMessage
				type={SystemMessageType.API}/>}

			{apiKey && searchCountryCode.code && searchCountryCode.isValid && <QueryClientProvider
				client={queryClient}>
				<HolidayTable
					country={searchCountryCode.code}
					holidayTypeFilter={selectedHolidayType}
					apiKey={apiKey}/>
			</QueryClientProvider>}


			<ApiKeyInput
				setApiKey={setApiKey}
				isMissing={!!searchCountryCode.code && !apiKey}/>

		</Container>
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



