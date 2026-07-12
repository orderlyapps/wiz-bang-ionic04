import type { Congregation } from "@shared/database/schemas/congregation";
import type { Publisher } from "@shared/database/schemas/publisher";

// Original app storage keys
const ORIGINAL_KEYS = {
  congregation: "user-congregation",
  publisher: "user-publisher",
  congregationId: "congregationId",
} as const;

// Current app storage keys
const CURRENT_KEYS = {
  congregation: "selected_congregation",
  publisher: "selected_publisher",
} as const;

export interface OriginalCongregation {
  id: string;
  name: string;
  congregation_id: string | null;
}

export interface OriginalPublisher {
  // Assuming similar structure - adjust if different
  id?: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  display_name?: string | null;
  congregation_id?: string;
  standing?: string;
  type?: string;
  gender?: string;
  auth_id?: string | null;
  family_id?: string | null;
  group_id?: string | null;
  // Add other fields as needed
}

export function migrateCongregation(): boolean {
  try {
    const originalData = localStorage.getItem(ORIGINAL_KEYS.congregation);
    if (!originalData) return false;

    const originalCongregation: OriginalCongregation = JSON.parse(originalData);

    // Skip if already migrated
    if (localStorage.getItem(CURRENT_KEYS.congregation)) return false;

    // Transform to current Congregation schema if needed
    const migratedCongregation: Congregation = {
      id: originalCongregation.id,
      name: originalCongregation.name,
      congregation_id: originalCongregation.congregation_id,
      // Add any field transformations needed
    };

    localStorage.setItem(CURRENT_KEYS.congregation, JSON.stringify(migratedCongregation));
    return true;
  } catch (error) {
    console.warn("Failed to migrate congregation data:", error);
    return false;
  }
}

export function migratePublisher(): boolean {
  try {
    const originalData = localStorage.getItem(ORIGINAL_KEYS.publisher);
    if (!originalData) {
      console.log("No original publisher data found");
      return false;
    }

    const originalPublisher: OriginalPublisher = JSON.parse(originalData);
    console.log("Original publisher data:", originalPublisher);

    // Skip if already migrated
    if (localStorage.getItem(CURRENT_KEYS.publisher)) {
      console.log("Publisher already migrated");
      return false;
    }

    // Transform to current Publisher schema if needed
    const migratedPublisher: Publisher = {
      id: originalPublisher.id || crypto.randomUUID(),
      first_name: originalPublisher.first_name,
      middle_name: originalPublisher.middle_name || null,
      last_name: originalPublisher.last_name,
      display_name: originalPublisher.display_name || null,
      congregation_id: originalPublisher.congregation_id || "",
      standing: (originalPublisher.standing as Publisher["standing"]) || "publisher",
      type: (originalPublisher.type as Publisher["type"]) || "publisher",
      gender: (originalPublisher.gender as Publisher["gender"]) || "male",
      family_id: originalPublisher.family_id || null,
      group_id: originalPublisher.group_id || null,
      auth_id: originalPublisher.auth_id || null,
      archived_at: null,
    };

    console.log("Migrated publisher data:", migratedPublisher);
    localStorage.setItem(CURRENT_KEYS.publisher, JSON.stringify(migratedPublisher));
    return true;
  } catch (error) {
    console.warn("Failed to migrate publisher data:", error);
    return false;
  }
}

export function hasOriginalData(): boolean {
  return !!(
    localStorage.getItem(ORIGINAL_KEYS.congregation) ||
    localStorage.getItem(ORIGINAL_KEYS.publisher)
  );
}

export function hasMigratedData(): boolean {
  return !!(
    localStorage.getItem(CURRENT_KEYS.congregation) || localStorage.getItem(CURRENT_KEYS.publisher)
  );
}

export function cleanupOriginalData(): void {
  // Optionally clean up original data after successful migration
  // Only remove if migration was successful
  if (localStorage.getItem(CURRENT_KEYS.congregation)) {
    localStorage.removeItem(ORIGINAL_KEYS.congregation);
    localStorage.removeItem(ORIGINAL_KEYS.congregationId);
  }

  if (localStorage.getItem(CURRENT_KEYS.publisher)) {
    localStorage.removeItem(ORIGINAL_KEYS.publisher);
  }
}
