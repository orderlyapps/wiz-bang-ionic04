import type { FontSize } from "@util/app/font-size/types";
import { localStorageKeys } from "@util/constants/localStorageKeys";

const FONT_SIZE_VALUES: readonly FontSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

export const FONT_SCALE_MAP: Record<FontSize, number> = {
  xs: 0.85,
  sm: 0.925,
  md: 1,
  lg: 1.1,
  xl: 1.2,
  "2xl": 1.3,
};

export const DEFAULT_FONT_SIZE: FontSize = "md";

type Listener = (size: FontSize) => void;
const listeners: Listener[] = [];

export function subscribeToFontSize(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

export function notifyFontSizeChange(size: FontSize): void {
  listeners.forEach((listener) => listener(size));
}

export function getStoredFontSize(): FontSize | null {
  const stored = localStorage.getItem(localStorageKeys.fontSize);
  if (stored && (FONT_SIZE_VALUES as readonly string[]).includes(stored)) {
    return stored as FontSize;
  }
  return null;
}

export function setStoredFontSize(size: FontSize): void {
  localStorage.setItem(localStorageKeys.fontSize, size);
  notifyFontSizeChange(size);
}

export function applyFontSize(size: FontSize): void {
  const scale = FONT_SCALE_MAP[size];
  document.documentElement.style.setProperty("--app-font-scale", String(scale));
}

export function initFontSize(): void {
  const stored = getStoredFontSize() ?? DEFAULT_FONT_SIZE;
  applyFontSize(stored);
}
