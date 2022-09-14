import React from "react";
import {ApiKeyInputFieldStyled, ApiKeyInputWrapper} from "./ApiKeyInput.styled";


export function ApiKeyInput({setApiKey, isMissing}: { setApiKey: React.Dispatch<React.SetStateAction<string>>, isMissing: boolean }) {

	return (
		<ApiKeyInputWrapper>
			<ApiKeyInputFieldStyled
				type="text"
				name="api-key-input"
				placeholder="Enter API Key"
				onChange={(e) => setApiKey(e.currentTarget.value)}
				isMissing={isMissing}
			/>
		</ApiKeyInputWrapper>
	);
}