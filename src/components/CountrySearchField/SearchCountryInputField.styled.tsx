import styled from "styled-components";

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

export const InputFieldStyled = styled.input`
	border-radius: 4px;
	border: 1px solid hsl(0, 0%, 80%);
	width: 300px;
	height: 38px;
	font-size: 14px;
	padding-left: 10px;
	box-sizing: border-box;
`;

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