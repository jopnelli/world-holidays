import React from "react";
import { SystemMessageType } from "./SystemMessage.types";
import { Description, Title, Wrapper } from "./SystemMessage.styled";

export function SystemMessage({ type }: { type: SystemMessageType }) {
  return (
    <Wrapper>
      <Title>{systemMessageData[type].title}</Title>

      <Description>{systemMessageData[type].description}</Description>
    </Wrapper>
  );
}

const systemMessageData = {
  [SystemMessageType.COUNTRY_EMPTY]: {
    title: "Welcome!",
    description:
      "Start typing a country in the search box above to load holidays.",
  },
  [SystemMessageType.API]: {
    title: "Missing API Key.",
    description: "Please enter your API Key below.",
  },
  [SystemMessageType.ERROR]: {
    title: "Oh no!",
    description: "Something went wrong. Please try again.",
  },
};
