"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "panini-parser-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const currentTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
    document.documentElement.dataset.theme = currentTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#DDD3C2] bg-[#FDFCFA] text-[#8C6A24] transition-colors hover:bg-[#FAF1DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]"
    >
      {theme === "light" ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
