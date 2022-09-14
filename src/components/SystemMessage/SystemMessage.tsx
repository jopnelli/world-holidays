import {SystemMessageType} from "./SystemMessage.types";
import {SystemMessageDescription, SystemMessageTitle, SystemMessageWrapper} from "./SystemMessage.styled";

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
		description: "Start typing a country in the search box above to load holidays."
	},
	[SystemMessageType.API]: {
		title: "Missing API Key.",
		description: "Please enter your API Key below."
	},
	[SystemMessageType.ERROR]: {
		title: "Oh no!",
		description: "Something went wrong. Please try again."
	},
};

