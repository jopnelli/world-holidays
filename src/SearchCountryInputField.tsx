import React, {Dispatch, SetStateAction, useEffect} from "react";
import {useState} from "react";
import "./SearchCountryInputField.css";
import {supportedCountries, supportedCountryCodes, supportedCountryNames} from "./supportedCountries";

type AutocompleteState = {
    activeSuggestion: number,
    filteredSuggestions: string[],
    showSuggestions: boolean,
    userInput: string
}

// TODO: replace suggestions with direct link to supportedCountryNames
export function SearchCountryInputField({suggestions, setSearchCountry}: { suggestions: string[], setSearchCountry: Dispatch<SetStateAction<{ code: string; isValid: boolean; }>> }) {
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

		const filteredSuggestions = suggestions
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
				<ul
					className="suggestions">
					{autocompleteState.filteredSuggestions.map((suggestion, index) => {
						let className;

						if (index === autocompleteState.activeSuggestion) {
							className = "suggestion-active";
						}
						return (
							<li
								className={className}
								key={suggestion}
								onClick={onClick}>
								{suggestion}
							</li>
						);
					})}
				</ul>
			);
		} else {
			suggestionsListComponent = (
				<div
					className="no-suggestions">
					<em>No suggestions available.</em>
				</div>
			);
		}
	}

	return (
		<>
			<input
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