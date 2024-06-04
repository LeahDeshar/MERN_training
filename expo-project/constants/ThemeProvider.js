import React, { createContext, useEffect, useState, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

const ThemeContext = createContext({
  dark: false,
  colors: Colors.light,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    dark: isDark,
    colors: isDark ? Colors.dark : Colors.light,
    setScheme: (scheme) => setIsDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
