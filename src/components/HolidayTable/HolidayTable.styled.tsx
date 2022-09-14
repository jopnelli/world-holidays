import styled, { keyframes } from "styled-components";

export const TableStyled = styled.div`
  border: 1px solid #c5cfdc;
  border-radius: 10px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;

    font-weight: 400;
    font-size: 0.9rem;
  }

  thead,
  th {
    border-bottom: 1px solid #c5cfdc;
  }

  th,
  td {
    padding: 15px;
    text-align: left;
  }

  td:first-child {
    font-weight: 600;
  }

  td:nth-child(2) {
    white-space: nowrap;
  }

  thead,
  tr:nth-child(even) {
    background-color: #f9fbfc;
  }

  th:first-child {
    border-top-left-radius: 10px;
  }
  th:last-child {
    border-top-right-radius: 10px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;

export const HolidayTypeStyled = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 6px;
  border-radius: 3px;
  height: fit-content;
`;

export const HolidayTypeTableCell = styled.div`
  display: flex;
  gap: 10px;
`;

export const loadingAnimation = keyframes`
 0% { background-color: #D3D3D3 }
 50% { background-color: #EBECF0; opacity: 1 }
 100% { background-color: #949494; opacity: 0.6; }
`;

export const LoadingStateSkeleton = styled.div`
  height: 10px;
  background: grey;
  min-width: 40px;
  animation: ${loadingAnimation} 2s linear infinite alternate;
`;
