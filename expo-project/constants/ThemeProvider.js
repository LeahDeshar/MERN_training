import { useColorScheme } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { LightColors, DarkColors } from "./Colors";
export const ThemeContext = () =>
  createContext({
    dark: false,
    colors: DarkColors,
    setScheme: () => {},
  });
const ThemeProvider = (props) => {
  const colorScheme = useColorScheme(colorScheme == "dark");
  const [isDark, setIsDark] = useState(colorScheme == "dark");

  useEffect(() => {
    setIsDark(colorScheme == "dark");
  }, [colorScheme]);

  const defaultTheme = {
    dark: isDark,
    colors: isDark ? DarkColors : LightColors,
    setScheme: (scheme) => setIsDark(scheme),
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
