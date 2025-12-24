import icon_moon from "/icon-moon.svg";
import icon_sun from "/icon-sun.svg";
import logo from "/logo.svg";
import { useState, useEffect } from "react";
import "./Header.css";

export function Header() {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="header">
      <img className="logo" src={logo} alt="" />
      <label className="switch-theme">
        <input
          checked={theme === "dark"}
          id="theme-toggle"
          type="checkbox"
          onChange={toggleTheme}
        />

        {theme === "dark" ? (
          <img className="sun" src={icon_sun} alt="Icon sun" />
        ) : (
          <img className="moon" src={icon_moon} alt="Icon moon" />
        )}
      </label>
    </header>
  );
}
