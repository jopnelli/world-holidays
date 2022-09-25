import React, { useEffect, useState } from "react";
import { ThemeSwitchButtonStyled } from "./ThemeSwitchButton.styled";

// tbc
export function ThemeSwitchButton() {
  const [theme, setTheme] = useState("Light");

  const nextTheme = theme === "Light" ? "Dark" : "Light";

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeSwitchButtonStyled onClick={() => setTheme(nextTheme)}>
      {nextTheme} mode
    </ThemeSwitchButtonStyled>
  );
}
