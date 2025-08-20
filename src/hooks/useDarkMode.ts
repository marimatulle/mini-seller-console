import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [enabled, setEnabled] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);

  return { enabled, toggle: () => setEnabled(!enabled) };
};
