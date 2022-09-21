import React, { useEffect } from "react";
import { ApiKeyInputFieldStyled, Wrapper } from "./ApiKeyInputField.styled";

export function ApiKeyInputField({
  apiKey,
  onChange,
  isMissing,
}: {
  apiKey: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isMissing: boolean;
}) {
  useEffect(() => {
    if (!apiKey) {
      const storedApiKey = localStorage.getItem("apiKey");
      if (storedApiKey) onChange(storedApiKey);
    }
  }, [onChange]);

  return (
    <Wrapper>
      <ApiKeyInputFieldStyled
        type="text"
        name="api-key-input"
        placeholder="Enter API Key"
        defaultValue={apiKey}
        onChange={(e) => {
          localStorage.setItem("apiKey", e.currentTarget.value);
          onChange(e.currentTarget.value);
        }}
        isMissing={isMissing}
      />
    </Wrapper>
  );
}
