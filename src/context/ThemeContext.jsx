import React, { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

export const ThemeContext = createContext();

export function ThemeProviderCustom({ children }) {
  const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeObject = theme === "dark" ? darkTheme : lightTheme;

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, themeObject, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}