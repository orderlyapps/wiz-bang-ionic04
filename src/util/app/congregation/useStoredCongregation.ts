import { useEffect, useState } from "react";
import type { Congregation } from "@shared/database/schemas/congregation";
import { getStoredCongregation, CONGREGATION_CHANGE_EVENT } from "./utils";

export function useStoredCongregation(): Congregation | null {
  const [congregation, setCongregation] = useState<Congregation | null>(getStoredCongregation);

  useEffect(() => {
    function handleChange() {
      setCongregation(getStoredCongregation());
    }

    window.addEventListener(CONGREGATION_CHANGE_EVENT, handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener(CONGREGATION_CHANGE_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return congregation;
}
