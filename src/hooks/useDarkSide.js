import { useState, useEffect } from "react";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      localStorage.setItem("theme", theme);
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return [theme, handleThemeSwitch];
}
