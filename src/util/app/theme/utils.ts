import type { ThemeMode } from "@util/app/theme";
import { localStorageKeys } from "@util/constants/localStorageKeys";

export function getStoredTheme(): ThemeMode | null {
  const stored = localStorage.getItem(localStorageKeys.themeMode);
  if (stored === "light" || stored === "dark" || stored === "auto") {
    return stored;
  }
  return null;
}

export function setStoredTheme(mode: ThemeMode): void {
  localStorage.setItem(localStorageKeys.themeMode, mode);
}

export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;

  root.classList.remove("ion-palette-light", "ion-palette-dark");

  if (mode === "light") {
    root.classList.add("ion-palette-light");
  } else if (mode === "dark") {
    root.classList.add("ion-palette-dark");
  } else {
    const prefers_dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.add(prefers_dark ? "ion-palette-dark" : "ion-palette-light");
  }
}

export function initTheme(): void {
  const stored = getStoredTheme() ?? "auto";
  applyTheme(stored);
}

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
