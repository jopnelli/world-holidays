import {HolidayTable} from "./components/HolidayTable";
import {QueryClient, QueryClientProvider} from "react-query";
import styled from "styled-components";
import {useState} from "react";
import {SearchCountryInputField, InputFieldStyled} from "./components/SearchCountryInputField";
import {SystemMessage} from "./components/SystemMessage";
import {HolidayType, SystemMessageType} from "./types";
import {HolidayTypeSelectField} from "./components/HolidayTypeSelectField";

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

				<SearchCountryInputFieldWrapper>
					<SearchCountryInputField
						setSearchCountry={setSearchCountryCode}/>
				</SearchCountryInputFieldWrapper>

				<HolidayTypeSelectFieldWrapper>
					<HolidayTypeSelectField
						setSelectedType={setSelectedHolidayType}/>
				</HolidayTypeSelectFieldWrapper>

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

			<ApiKeyInputWrapper>
				<StyledApiKeyInputField
					type="text"
					name="api-key-input"
					placeholder="Enter API Key"
					onChange={(e) => setApiKey(e.currentTarget.value)}
					isMissing={!!searchCountryCode.code && !apiKey}/>
			</ApiKeyInputWrapper>
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

const StyledApiKeyInputField = styled(InputFieldStyled)<{isMissing: boolean}>`
	border: ${p => p.isMissing ? "3px solid red" : "1px solid hsl(0, 0%, 80%)"};
`;

const SearchCountryInputFieldWrapper = styled.div`
	position: relative;
`;

const HolidayTypeSelectFieldWrapper = styled.div`
	& #react-select-2-placeholder {
		font-size: 14px;
	}
`;

const ApiKeyInputWrapper = styled.div`
	padding: 30px;
	display: flex;
	justify-content: center;
`;
