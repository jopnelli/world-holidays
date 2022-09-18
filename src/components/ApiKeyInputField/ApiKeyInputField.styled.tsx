import styled, { css } from "styled-components";
import { InputField } from "../../shared/StyledComponents";

export const ApiKeyInputFieldStyled = styled(InputField)<{
  isMissing: boolean;
}>`
  border: 1px solid hsl(0, 0%, 80%);

  ${(p) =>
    p.isMissing &&
    css`
      border: 3px solid red;
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
  margin-top: 10px;
  box-sizing: border-box;
`;
