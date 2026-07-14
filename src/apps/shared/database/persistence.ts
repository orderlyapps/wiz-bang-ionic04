import {
  BrowserCollectionCoordinator,
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const DB_NAME = "tanstack";

// Shared OPFS-backed SQLite database used by all persisted TanStack DB
// collections in this app. Top-level await is supported by Vite + ESM.
//
// OPFS may be unavailable (older browsers, sandboxed iframes, some
// private-browsing modes). We surface the error to the console so the failure
// is visible during bootstrap and rethrow so callers fail fast rather than
// silently running without persistence.
async function openDatabase() {
  return openBrowserWASQLiteOPFSDatabase({
    databaseName: `${DB_NAME}.sqlite`,
  });
}

async function removeDatabaseFiles(): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.storage?.getDirectory) return;
  try {
    const root = await navigator.storage.getDirectory();
    const suffixes = ["", "-journal", "-wal", "-shm"];
    for (const suffix of suffixes) {
      try {
        await root.removeEntry(`${DB_NAME}.sqlite${suffix}`, { recursive: true });
      } catch {
        // Ignore per-file cleanup errors.
      }
    }
  } catch {
    // Ignore cleanup errors.
  }
}

if (typeof navigator === "undefined" || !navigator.storage?.getDirectory) {
  throw new Error(
    "OPFS is not available in this browser/context. TanStack DB persistence requires a secure context with Origin Private File System support.",
  );
}

async function openDatabaseWithRetry(): Promise<
  Awaited<ReturnType<typeof openBrowserWASQLiteOPFSDatabase>>
> {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await openDatabase();
    } catch (error) {
      const willRetry = attempt < maxAttempts;
      console.warn(
        `OPFS database open failed (attempt ${attempt}/${maxAttempts}):`,
        error,
        willRetry ? "Retrying after cleanup." : "No more retries.",
      );
      if (!willRetry) {
        console.error(
          "Failed to open OPFS-backed SQLite database for TanStack DB persistence. " +
            "The current browser/context likely does not support OPFS or the database file is corrupted.",
          error,
        );
        throw error;
      }
      await removeDatabaseFiles();
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error("Unreachable");
}

const database = await openDatabaseWithRetry();

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    try {
      await database.close?.();
    } catch {
      // Ignore cleanup errors during HMR disposal.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}

// Multi-tab safe coordinator: uses BroadcastChannel + Web Locks so only one
// tab/process owns the SQLite writer. Without this, concurrent tabs would
// corrupt the shared OPFS database.
const coordinator = new BrowserCollectionCoordinator({ dbName: DB_NAME });

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    const closeResult = database.close?.();
    if (closeResult) {
      closeResult.catch(() => {
        // Ignore cleanup errors.
      });
    }
  });
}

// Shared persistence instance reused across every collection that opts into
// persistence.
export const persistence = createBrowserWASQLitePersistence({
  database,
  coordinator,
});

/**
 * Clears all TanStack DB data by closing the database connection and deleting
 * the SQLite file from OPFS. This will be recreated on next app load.
 * Call before page reload.
 */
export async function clearAllTanstackData(): Promise<void> {
  try {
    await database.close?.();
  } catch (error) {
    console.error("Failed to close TanStack DB connection:", error);
  }
  await removeDatabaseFiles();
}
