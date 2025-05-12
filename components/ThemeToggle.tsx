"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useThemeChangeAnimation } from "@/lib/animations";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const overlayRef = useThemeChangeAnimation();

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-40 rounded-full"
        style={{
          transformOrigin: "bottom right",
          transform: "scale(0)",
          opacity: 0,
        }}
      />
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
