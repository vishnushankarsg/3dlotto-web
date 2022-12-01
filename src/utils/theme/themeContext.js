import { createContext } from "react";

export const themes = {
  dark: "",
  light: "theme--dark",  
};

export const ThemeContext = createContext({
    theme: themes.dark,
  changeTheme: () => {},
});