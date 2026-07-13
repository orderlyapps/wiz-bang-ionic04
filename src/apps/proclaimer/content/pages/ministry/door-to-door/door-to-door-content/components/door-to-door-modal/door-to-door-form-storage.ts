import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

export type DoorToDoorFormState = {
  suburb?: Suburb;
  street?: Street;
  house_number: string;
  unit_number: string;
  visit_type: "letter" | "return" | "return_visit";
};

function storageKey(): string {
  return localStorageKeys.doorToDoorForm;
}

export function loadDoorToDoorForm(): DoorToDoorFormState | null {
  try {
    const raw = localStorage.getItem(storageKey());
    return raw ? (JSON.parse(raw) as DoorToDoorFormState) : null;
  } catch {
    return null;
  }
}

export function saveDoorToDoorForm(state: DoorToDoorFormState): void {
  localStorage.setItem(storageKey(), JSON.stringify(state));
}
