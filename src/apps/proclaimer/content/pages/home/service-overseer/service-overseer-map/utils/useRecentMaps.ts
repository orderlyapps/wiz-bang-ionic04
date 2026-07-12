const STORAGE_KEY = "proclaimer:recent-map-ids";
const MAX_RECENT = 5;

function readIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function recordRecentMap(id: string): void {
  const ids = readIds().filter((existing) => existing !== id);
  ids.unshift(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_RECENT)));
}

export function getRecentMapIds(): string[] {
  return readIds().slice(0, MAX_RECENT);
}
