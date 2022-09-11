import styled from "styled-components";
import {SystemMessageType} from "./types";

export function SystemMessage({type}: { type: SystemMessageType }) {

	return <SystemMessageWrapper>
		<SystemMessageTitle>
			{systemMessageData[type].title}
		</SystemMessageTitle>
		<SystemMessageDescription>
			{systemMessageData[type].description}
		</SystemMessageDescription>
	</SystemMessageWrapper>;
}

const systemMessageData = {
	[SystemMessageType.EMPTY]: {
		title: "Welcome!",
		description: "Start typing a country in the search box above to load holidays.",
	},
	[SystemMessageType.ERROR]: {
		title: "Oh no!",
		description: "Something went wrong. Please try again.",
	},
	[SystemMessageType.LOADING]: {
		title: "Loading holidays...",
		description: "Your results will be here soon.",
	}
};

const SystemMessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
`;

const SystemMessageTitle = styled.div`
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 1rem;
`;

const SystemMessageDescription = styled.div`
    font-size: 14px;
`;