import { rxdb } from "@shared/database/rxdb/database";
import type { ReturnVisitLocal } from "@shared/database/rxdb/collections/return-visit";

export async function exportReturnVisitData(): Promise<Blob> {
  const docs = await rxdb.return_visit.find().exec();
  const data = docs.map((doc) => doc.toJSON() as ReturnVisitLocal);
  const json = JSON.stringify(data, null, 2);
  return new Blob([json], { type: "application/json" });
}

export async function importReturnVisitData(file: File): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error("Invalid file format: expected an array of return visits");
  }

  await rxdb.return_visit.find().remove();

  if (data.length > 0) {
    await rxdb.return_visit.bulkInsert(data as ReturnVisitLocal[]);
  }
}

export function generateReturnVisitExportFilename(): string {
  const date = new Date().toISOString().split("T")[0];
  return `return-visits-${date}.json`;
}
