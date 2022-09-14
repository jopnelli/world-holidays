import styled from "styled-components";
import { InputFieldStyled } from "../CountrySearchField/SearchCountryInputField.styled";

export const ApiKeyInputFieldStyled = styled(InputFieldStyled)<{
  isMissing: boolean;
}>`
  border: ${(p) =>
    p.isMissing ? "3px solid red" : "1px solid hsl(0, 0%, 80%)"};
`;

export const ApiKeyInputWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
`;
