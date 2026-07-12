import { useEffect } from "react";

const META_SELECTOR = 'meta[name="theme-color"]';
const DEFAULT_DARK = "#000000";

export function useThemeColorWhileOpen(is_open: boolean, color: string = DEFAULT_DARK) {
  useEffect(() => {
    if (!is_open) return;

    const meta = document.head.querySelector<HTMLMetaElement>(META_SELECTOR);
    if (!meta) return;

    const previous = meta.content;
    meta.content = color;

    return () => {
      meta.content = previous;
    };
  }, [is_open, color]);
}
