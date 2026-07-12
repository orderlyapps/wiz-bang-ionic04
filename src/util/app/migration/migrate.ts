import {
  hasOriginalData,
  hasMigratedData,
  migrateCongregation,
  migratePublisher,
  cleanupOriginalData,
} from "./utils";

const MIGRATION_VERSION_KEY = "app_migration_version";
const CURRENT_MIGRATION_VERSION = "1.0.0";

export interface MigrationResult {
  success: boolean;
  congregationMigrated: boolean;
  publisherMigrated: boolean;
  error?: string;
}

export function runMigration(): MigrationResult {
  try {
    // Check if migration is needed
    if (!hasOriginalData()) {
      return {
        success: true,
        congregationMigrated: false,
        publisherMigrated: false,
      };
    }

    // Check if already migrated
    if (hasMigratedData()) {
      return {
        success: true,
        congregationMigrated: false,
        publisherMigrated: false,
      };
    }

    // Perform migration
    const congregationMigrated = migrateCongregation();
    const publisherMigrated = migratePublisher();

    // Mark migration as complete
    localStorage.setItem(MIGRATION_VERSION_KEY, CURRENT_MIGRATION_VERSION);

    // Optionally clean up original data after successful migration
    if (congregationMigrated || publisherMigrated) {
      cleanupOriginalData();
    }

    return {
      success: true,
      congregationMigrated,
      publisherMigrated,
    };
  } catch (error) {
    console.error("Migration failed:", error);
    return {
      success: false,
      congregationMigrated: false,
      publisherMigrated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function hasMigrated(): boolean {
  return !!localStorage.getItem(MIGRATION_VERSION_KEY);
}

export function getMigrationVersion(): string | null {
  return localStorage.getItem(MIGRATION_VERSION_KEY);
}
