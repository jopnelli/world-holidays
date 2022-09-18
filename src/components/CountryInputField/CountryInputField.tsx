import React, { useEffect, useState } from "react";
import { supportedCountryNames } from "../../shared/supportedCountries";
import { CountryInputFieldStyled, Wrapper } from "./CountryInputField.styled";
import { AutocompleteState } from "./CountryInputField.types";
import { getCountryCode, inputIsValid } from "./CountryInputField.helpers";
import { SuggestionsList } from "./SuggestionsList";

export function CountryInputField({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    {
      activeSuggestion: 0,
      filteredSuggestions: [],
      hasSuggestions: false,
      userInput: "",
    }
  );

  useEffect(() => {
    if (inputIsValid(autocompleteState.userInput))
      onChange(getCountryCode(autocompleteState.userInput));
  }, [autocompleteState.userInput, onChange]);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = supportedCountryNames.filter(
      (s) => s.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions,
      hasSuggestions: true,
      userInput,
    });
  }

  function onClickHandler(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    setAutocompleteState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      hasSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    const { activeSuggestion, filteredSuggestions } = autocompleteState;

    if (e.key === "Enter" && filteredSuggestions.length) {
      setAutocompleteState({
        activeSuggestion: 0,
        filteredSuggestions,
        hasSuggestions: false,
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

  return (
    <Wrapper>
      <CountryInputFieldStyled
        type="text"
        placeholder="Start typing to search country..."
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        value={autocompleteState.userInput}
      />
      <SuggestionsList
        autocompleteState={autocompleteState}
        onClick={onClickHandler}
      />
    </Wrapper>
  );
}
