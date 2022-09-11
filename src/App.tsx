import {HolidayTable} from "./HolidayTable";
import {QueryClientProvider, QueryClient} from "react-query";
import styled from "styled-components";
import {useState} from "react";
import {supportedCountryNames} from "./supportedCountries";
import {SearchCountryInputField} from "./SearchCountryInputField";
import {SystemMessage} from "./SystemMessage";
import {HolidayType, SystemMessageType} from "./types";
import {HolidayTypeSelectField} from "./HolidayTypeSelectField";

// TODO: fix styling
// TODO: add api key input
export default function App() {
	const [selectedType, setSelectedType] = useState<HolidayType[]>([]);
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
						suggestions={supportedCountryNames}
						setSearchCountry={setSearchCountryCode}
					/>
				</SearchCountryInputFieldWrapper>
				<HolidayTypeSelectFieldWrapper>
					<HolidayTypeSelectField
						setSelectedType={setSelectedType}/>
				</HolidayTypeSelectFieldWrapper>
			</HolidayTableControlsWrapper>

			{!searchCountryCode.code && <SystemMessage
				type={SystemMessageType.EMPTY}/>}

			{searchCountryCode.code && !searchCountryCode.isValid && <SystemMessage
				type={SystemMessageType.ERROR}/>}

			{searchCountryCode.code && searchCountryCode.isValid && <QueryClientProvider
				client={queryClient}>
				<HolidayTable
					country={searchCountryCode.code}
					holidayTypeFilter={selectedType}
				/>
			</QueryClientProvider>}

			<ApiKeyInputWrapper>
				<StyledInputField
					type="text"
					name="api-key-input"
					placeholder="Override API KEY"
					onChange={(e) => console.log(e.currentTarget.value)}
				/>
			</ApiKeyInputWrapper>
		</Container>
	); 
}

const Container = styled.div`
	position: relative;
	padding-bottom: 30px;
	height: 100%;
`;

const HolidayTableControlsWrapper = styled.div`
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
`;

const SearchCountryInputFieldWrapper = styled.div`
	width: 300px;
	height: 38px;
`;

const StyledInputField = styled.input`
`;

const HolidayTypeSelectFieldWrapper = styled.div`
	border-radius: 10px;
	border-width: 1px;
	width: 250px;
`;

const ApiKeyInputWrapper = styled.div`
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translate(-50%, -50%);
`;