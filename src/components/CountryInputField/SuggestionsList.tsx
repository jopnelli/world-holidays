import React from "react";
import {
  Wrapper,
  SuggestionsListStyled,
  ListItem,
} from "./SuggestionsList.styled";
import { AutocompleteState } from "./CountryInputField.types";

export function SuggestionsList({
  autocompleteState,
  onClick,
}: {
  autocompleteState: AutocompleteState;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) {
  if (autocompleteState.hasSuggestions && autocompleteState.userInput) {
    if (autocompleteState.filteredSuggestions.length) {
      return (
        <SuggestionsListStyled>
          {autocompleteState.filteredSuggestions.map((suggestion, index) => {
            return (
              <ListItem
                key={suggestion}
                isActive={index === autocompleteState.activeSuggestion}
                onClick={onClick}
              >
                {suggestion}
              </ListItem>
            );
          })}
        </SuggestionsListStyled>
      );
    }
    return (
      <Wrapper>
        <em>No suggestions available.</em>
      </Wrapper>
    );
  }

  return <></>;
}
