"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add transition effect when switching themes
  useEffect(() => {
    document.documentElement.classList.add("transition-colors");
    document.documentElement.style.transitionDuration = "500ms";

    return () => {
      document.documentElement.classList.remove("transition-colors");
      document.documentElement.style.transitionDuration = "";
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
