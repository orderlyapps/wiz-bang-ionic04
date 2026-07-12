import type { PublisherLocal } from "@shared/database/rxdb/collections/publisher";
import { rxdb } from "@shared/database/rxdb/database";

/**
 * Fields that are always included in an export. These are required by the
 * schema (primary key, identity, version metadata) and must be present for the
 * exported data to remain valid for re-import.
 */
export const ALWAYS_EXPORTED_PUBLISHER_FIELDS = [
  "publisher_id",
  "confidential_id",
  "version",
] as const satisfies readonly (keyof PublisherLocal)[];

/**
 * Optional fields the user may opt-in to include in an export.
 */
export const OPTIONAL_PUBLISHER_EXPORT_FIELDS = [
  "phone",
  "address",
  "email",
  "emergency_contact",
  "photo",
  "birth_date",
  "baptism_date",
] as const satisfies readonly (keyof PublisherLocal)[];

export type OptionalPublisherExportField = (typeof OPTIONAL_PUBLISHER_EXPORT_FIELDS)[number];

/**
 * Build an exporter that only includes the user-selected optional fields.
 * `publisher_id`, `confidential_id` and `version` are always included.
 */
export function createPublisherLocalExporter(
  selectedOptionalFields: readonly OptionalPublisherExportField[],
): () => Promise<Blob> {
  const allowedKeys = new Set<keyof PublisherLocal>([
    ...ALWAYS_EXPORTED_PUBLISHER_FIELDS,
    ...selectedOptionalFields,
  ]);

  return async () => {
    const docs = await rxdb.publisher.find().exec();
    const data = docs.map((doc) => {
      const full = doc.toJSON() as PublisherLocal;
      const filtered: Partial<PublisherLocal> = {};
      for (const key of Object.keys(full) as (keyof PublisherLocal)[]) {
        if (allowedKeys.has(key)) {
          (filtered as Record<string, unknown>)[key] = full[key];
        }
      }
      return filtered;
    });
    const json = JSON.stringify(data, null, 2);
    return new Blob([json], { type: "application/json" });
  };
}

export async function importPublisherLocalData(file: File): Promise<void> {
  const text = await file.text();
  const data: PublisherLocal[] = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error("Invalid file format: expected an array of publishers");
  }

  await rxdb.publisher.find().remove();

  await rxdb.publisher.bulkInsert(data);
}

export function generateExportFilename(): string {
  const date = new Date().toISOString().split("T")[0];
  return `publisher-local-${date}.json`;
}
