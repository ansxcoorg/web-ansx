"use client";

import { useEffect, useState } from "react";

const themes = ["default", "songkran", "halloween", "newyear"];

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
    setTheme(savedTheme);
    document.documentElement.className = `theme-${savedTheme}`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.documentElement.className = `theme-${newTheme}`;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      {/* Theme Switcher UI */}
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 shadow-md p-2 rounded-md">
        <label htmlFor="theme-select" className="mr-2 text-sm">🎨 เปลี่ยนธีม:</label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleChange}
          className="px-2 py-1 text-sm rounded-md border"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {children}
    </div>
  );
}
