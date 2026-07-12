import {
  DEFAULT_FONT_SIZE,
  applyFontSize,
  getStoredFontSize,
  setStoredFontSize,
  subscribeToFontSize,
} from "@util/app/font-size/utils";
import type { FontSize } from "@util/app/font-size/types";
import { useEffect, useState } from "react";

export function useFontSize() {
  const [font_size, set_font_size] = useState<FontSize>(
    () => getStoredFontSize() ?? DEFAULT_FONT_SIZE,
  );

  useEffect(() => {
    const unsubscribe = subscribeToFontSize((new_size) => {
      set_font_size(new_size);
      applyFontSize(new_size);
    });
    return unsubscribe;
  }, []);

  const setFontSize = (size: FontSize) => {
    setStoredFontSize(size);
    set_font_size(size);
    applyFontSize(size);
  };

  return {
    font_size,
    setFontSize,
  };
}
