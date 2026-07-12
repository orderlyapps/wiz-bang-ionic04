import { useState } from "react";
import type { AccordionGroupCustomEvent } from "@ionic/react";

export function useAccordionState(storageKey: string, defaultValue: string | undefined) {
  const [value, setValue] = useState<string | undefined>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored === null ? defaultValue : stored || undefined;
    } catch {
      return defaultValue;
    }
  });

  function onIonChange(event: AccordionGroupCustomEvent) {
    const next = event.detail.value as string | undefined;
    setValue(next);
    try {
      localStorage.setItem(storageKey, next ?? "");
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  return { value, onIonChange };
}
