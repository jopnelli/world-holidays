import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supportedCountryNames } from "../../shared/supportedCountries";
import {
  NoSuggestionsStyled,
  CountryInputFieldStyled,
  SearchCountryInputFieldWrapper,
  StyledList,
  StyledListItem,
} from "./CountryInputField.styled";
import { AutocompleteState } from "./CountryInputField.types";
import { findCountryCode, inputIsValid } from "./CountryInputField.helpers";

export function CountryInputField({
  setSearchCountry,
}: {
  setSearchCountry: Dispatch<
    SetStateAction<{ code: string; isValid: boolean }>
  >;
}) {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    }
  );

  useEffect(() => {
    if (inputIsValid(autocompleteState.userInput)) {
      setSearchCountry({
        code: findCountryCode(autocompleteState.userInput),
        isValid: true,
      });
    }
    if (!inputIsValid(autocompleteState.userInput)) {
      setSearchCountry({ code: "", isValid: false });
    }
  }, [autocompleteState.userInput, setSearchCountry]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = supportedCountryNames.filter(
      (s) => s.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  }

  function onClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const { activeSuggestion, filteredSuggestions } = autocompleteState;

    if (e.key === "Enter" && filteredSuggestions.length) {
      setAutocompleteState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }

    if (e.key === "ArrowUp") {
      if (activeSuggestion === 0) return;

      setAutocompleteState((prevState) => {
        return { ...prevState, activeSuggestion: activeSuggestion - 1 };
      });
    }

    if (e.key === "ArrowDown") {
      if (activeSuggestion - 1 === filteredSuggestions.length) return;

      setAutocompleteState((prevState) => {
        return { ...prevState, activeSuggestion: activeSuggestion + 1 };
      });
    }
  }

  let suggestionsListComponent;

  if (autocompleteState.showSuggestions && autocompleteState.userInput) {
    if (autocompleteState.filteredSuggestions.length) {
      suggestionsListComponent = (
        <StyledList>
          {autocompleteState.filteredSuggestions.map((suggestion, index) => {
            return (
              <StyledListItem
                key={suggestion}
                isActive={index === autocompleteState.activeSuggestion}
                onClick={onClick}
              >
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
    <SearchCountryInputFieldWrapper>
      <CountryInputFieldStyled
        type="text"
        placeholder="Start typing to search country..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={autocompleteState.userInput}
      />
      {suggestionsListComponent}
    </SearchCountryInputFieldWrapper>
  );
}
