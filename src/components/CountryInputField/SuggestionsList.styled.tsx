import styled, { css } from "styled-components";

export const SuggestionsListStyled = styled.ul`
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
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  position: absolute;
  top: 38px;
  left: 0;
`;

export const Wrapper = styled.div`
  color: #c5cfdc;
  font-size: 14px;
  padding: 5px 0;
`;

export const ListItem = styled.li<{ isActive: boolean }>`
  padding: 0.5rem;

  ${(p) =>
    p.isActive &&
    css`
      background-color: #f9fbfc;
      cursor: pointer;
      font-weight: 700;
    `}

  &:hover {
    background-color: #f9fbfc;
    cursor: pointer;
    font-weight: 700;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #c5cfdc;
  }
`;
