import { createContext, useState, useEffect, type ReactNode } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

interface QuickLinksContextType {
  fabVisible: boolean;
  updateFabVisible: (visible: boolean) => void;
}

const DEFAULT_FAB_VISIBLE = true;

const QuickLinksContext = createContext<QuickLinksContextType | undefined>(undefined);

function readStoredFabVisible(): boolean {
  try {
    const stored = localStorage.getItem(localStorageKeys.quickLinksFabVisible);
    if (stored === null) return DEFAULT_FAB_VISIBLE;
    return stored === "true";
  } catch {
    return DEFAULT_FAB_VISIBLE;
  }
}

export function QuickLinksProvider({ children }: { children: ReactNode }) {
  const [fabVisible, setFabVisible] = useState<boolean>(readStoredFabVisible);

  function updateFabVisible(visible: boolean) {
    try {
      localStorage.setItem(localStorageKeys.quickLinksFabVisible, String(visible));
      setFabVisible(visible);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === localStorageKeys.quickLinksFabVisible) {
        setFabVisible(e.newValue === "true");
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <QuickLinksContext.Provider value={{ fabVisible, updateFabVisible }}>
      {children}
    </QuickLinksContext.Provider>
  );
}

export { QuickLinksContext };
