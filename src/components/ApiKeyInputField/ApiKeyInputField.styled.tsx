import styled, { css } from "styled-components";
import { InputFieldStyled } from "../../shared/StyledComponents";

export const ApiKeyInputFieldStyled = styled(InputFieldStyled)<{
  isMissing: boolean;
}>`
  border: 1px solid hsl(0, 0%, 80%);

  ${(p) =>
    p.isMissing &&
    css`
      border: 3px solid red;
    `}
`;

export const ApiKeyInputWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
`;
