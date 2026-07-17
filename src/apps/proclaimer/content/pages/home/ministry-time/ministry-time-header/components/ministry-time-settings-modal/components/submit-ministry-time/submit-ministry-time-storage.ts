import { localStorageKeys } from "@util/constants/localStorageKeys";

export type MinistryReportFormState = {
  phone: string;
  bible_studies: number;
  comments: string;
};

function storageKey(): string {
  return localStorageKeys.ministryReportForm;
}

export function loadMinistryReportForm(): MinistryReportFormState | null {
  try {
    const raw = localStorage.getItem(storageKey());
    return raw ? (JSON.parse(raw) as MinistryReportFormState) : null;
  } catch {
    return null;
  }
}

export function saveMinistryReportForm(state: MinistryReportFormState): void {
  localStorage.setItem(storageKey(), JSON.stringify(state));
}
