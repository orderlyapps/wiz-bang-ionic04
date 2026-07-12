import { useEffect, useState } from "react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredPublisher } from "./publisherUtils";

export const PUBLISHER_CHANGE_EVENT = "publisher-change";

export function useStoredPublisher(): Publisher | null {
  const [publisher, setPublisher] = useState<Publisher | null>(getStoredPublisher);

  useEffect(() => {
    function handleChange() {
      setPublisher(getStoredPublisher());
    }

    window.addEventListener(PUBLISHER_CHANGE_EVENT, handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener(PUBLISHER_CHANGE_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return publisher;
}
