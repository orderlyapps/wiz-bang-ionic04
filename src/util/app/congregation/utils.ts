import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Congregation } from "@shared/database/schemas/congregation";
import { clearStoredPublisher } from "@proclaimer-shared/publisher/publisherUtils";

export const CONGREGATION_CHANGE_EVENT = "congregation-change";

export function getStoredCongregation(): Congregation | null {
  const stored = localStorage.getItem(localStorageKeys.selectedCongregation);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Congregation;
  } catch {
    return null;
  }
}

export function setStoredCongregation(congregation: Congregation): void {
  localStorage.setItem(localStorageKeys.selectedCongregation, JSON.stringify(congregation));
  clearStoredPublisher();
  window.dispatchEvent(new Event(CONGREGATION_CHANGE_EVENT));
}

export function clearStoredCongregation(): void {
  localStorage.removeItem(localStorageKeys.selectedCongregation);
  clearStoredPublisher();
  window.dispatchEvent(new Event(CONGREGATION_CHANGE_EVENT));
}

export function hasSelectedCongregation(): boolean {
  return getStoredCongregation() !== null;
}
