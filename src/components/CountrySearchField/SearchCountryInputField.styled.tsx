import styled from "styled-components";
import { InputFieldStyled } from "../../shared/StyledComponents";

export const StyledList = styled.ul`
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

export const NoSuggestionsStyled = styled.div`
  color: #c5cfdc;
  font-size: 14px;
  padding: 5px 0;
`;

export const SearchCountryInputFieldStyled = styled(InputFieldStyled)``;

export const StyledListItem = styled.li`
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

export const SearchCountryInputFieldWrapper = styled.div`
  position: relative;
`;
