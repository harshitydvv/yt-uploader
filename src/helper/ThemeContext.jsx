import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {

  // 🔥 Read from localStorage first
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  // 🔥 Save to localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }),
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};