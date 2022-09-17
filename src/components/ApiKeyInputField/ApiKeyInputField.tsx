import React, { useEffect } from "react";
import {
  ApiKeyInputFieldStyled,
  ApiKeyInputWrapper,
} from "./ApiKeyInputField.styled";

export function ApiKeyInputField({
  apiKey,
  setApiKey,
  isMissing,
}: {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  isMissing: boolean;
}) {
  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  return (
    <ApiKeyInputWrapper>
      <ApiKeyInputFieldStyled
        type="text"
        name="api-key-input"
        placeholder="Enter API Key"
        defaultValue={apiKey}
        onChange={(e) => {
          localStorage.setItem("apiKey", e.currentTarget.value);
          setApiKey(e.currentTarget.value);
        }}
        isMissing={isMissing}
      />
    </ApiKeyInputWrapper>
  );
}
