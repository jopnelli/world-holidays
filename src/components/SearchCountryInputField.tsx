import React, {Dispatch, SetStateAction, useEffect} from "react";
import {useState} from "react";
import {supportedCountries, supportedCountryCodes, supportedCountryNames} from "../supportedCountries";
import styled from "styled-components";

type AutocompleteState = {
    activeSuggestion: number,
    filteredSuggestions: string[],
    showSuggestions: boolean,
    userInput: string
}

export function SearchCountryInputField({ setSearchCountry}: { setSearchCountry: Dispatch<SetStateAction<{ code: string; isValid: boolean; }>> }) {
	const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>({
		activeSuggestion: 0,
		filteredSuggestions: [],
		showSuggestions: false,
		userInput: ""
	});

	useEffect(() => {
		if (inputIsValid(autocompleteState.userInput)) {
			setSearchCountry({code: findCountryCode(autocompleteState.userInput), isValid: true});
		}
		if (!inputIsValid(autocompleteState.userInput)) {
			setSearchCountry({code: "", isValid: false});
		}
	}, [autocompleteState.userInput]);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		const userInput = e.currentTarget.value;

		const filteredSuggestions = supportedCountryNames
			.filter(s => s.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

		setAutocompleteState({
			activeSuggestion: 0,
			filteredSuggestions,
			showSuggestions: true,
			userInput
		});
	}

	function onClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		setAutocompleteState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: e.currentTarget.innerText
		});
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		const {activeSuggestion, filteredSuggestions} = autocompleteState;

		if (e.key === "Enter" && filteredSuggestions.length) {
			setAutocompleteState({
				activeSuggestion: 0,
				filteredSuggestions,
				showSuggestions: false,
				userInput: filteredSuggestions[activeSuggestion]
			});
		}

		if (e.key === "ArrowUp") {
			if (activeSuggestion === 0) return;

			setAutocompleteState((prevState) => {
				return {...prevState, activeSuggestion: activeSuggestion - 1};
			});
		}

		if (e.key === "ArrowDown") {
			if (activeSuggestion - 1 === filteredSuggestions.length) return;

			setAutocompleteState((prevState) => {
				return {...prevState, activeSuggestion: activeSuggestion + 1};
			});
		}
	}

	let suggestionsListComponent;

	if (autocompleteState.showSuggestions && autocompleteState.userInput) {
		if (autocompleteState.filteredSuggestions.length) {
			suggestionsListComponent = (
				<StyledList>
					{autocompleteState.filteredSuggestions.map((suggestion) => {
						return (
							<StyledListItem
								key={suggestion}
								onClick={onClick}>
								{suggestion}
							</StyledListItem>
						);
					})}
				</StyledList>
			);
		} else {
			suggestionsListComponent = (
				<NoSuggestionsStyled>
					<em>No suggestions available.</em>
				</NoSuggestionsStyled>
			);
		}
	}

	return (
		<>
			<InputFieldStyled
				type="text"
				placeholder="Start typing to search country..."
				onChange={onChange}
				onKeyDown={onKeyDown}
				value={autocompleteState.userInput}/>
			{suggestionsListComponent}
		</>
	);
}

function inputIsValid(input: string) {
	return !((input.length !== 2 && !supportedCountryNames.includes(input)) ||
		(input.length === 2 && !supportedCountryCodes.includes(input)));
}

function findCountryCode(input: string) {
	if (input.length === 2) return input.toLowerCase();
	return supportedCountries.find(c => c.name === input)!.iso.toLowerCase();
}

const StyledList = styled.ul`
	border: 1px solid #c5cfdc;
	border-top-width: 0;
	border-radius: 0 0 5px 5px;
	list-style: none;
	margin-top: 3px;
	max-height: 143px;
	overflow-y: auto;
	padding-left: 0;
	width: 100%;
	box-sizing: border-box;
	font-size: 14px;
	
	position: absolute;
	top: 38px;
	left: 0;
`;

const StyledListItem = styled.li`
	padding: 0.5rem;

	&:hover {
	 background-color: #f9fbfc;
	 cursor: pointer;
	 font-weight: 700;
 }
	
	&:not(:last-of-type) {
		border-bottom: 1px solid #c5cfdc;
	}
`;

const NoSuggestionsStyled = styled.div`
	color: #c5cfdc;
	font-size: 14px;
	padding: 5px 0;
`;

export const InputFieldStyled = styled.input`
	border-radius: 4px;
	border: 1px solid hsl(0, 0%, 80%);
	width: 300px;
	height: 38px;
	font-size: 14px;
	padding-left: 10px;
	box-sizing: border-box;
`;