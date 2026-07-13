import type { MinistryTimeLocal } from "@shared/database/rxdb/collections/ministry-time";
import type { SettingsLocal } from "@shared/database/rxdb/collections/settings";
import { rxdb } from "@shared/database/rxdb/database";

const MINISTRY_TIME_FEATURE = "ministry_time";

interface MinistryTimeExport {
  ministry_time_entries: MinistryTimeLocal[];
  settings: SettingsLocal[];
}

export async function exportMinistryTimeData(): Promise<Blob> {
  const entryDocs = await rxdb.ministry_time.find().exec();
  const ministry_time_entries = entryDocs.map((doc) => doc.toJSON() as MinistryTimeLocal);

  const settingDocs = await rxdb.settings
    .find({
      selector: { feature: MINISTRY_TIME_FEATURE },
    })
    .exec();
  const settings = settingDocs.map((doc) => doc.toJSON() as SettingsLocal);

  const exportData: MinistryTimeExport = { ministry_time_entries, settings };
  const json = JSON.stringify(exportData, null, 2);
  return new Blob([json], { type: "application/json" });
}

export async function importMinistryTimeData(file: File): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text) as Partial<MinistryTimeExport>;

  if (!data || typeof data !== "object") {
    throw new Error("Invalid file format: expected a JSON object");
  }

  const entries = data.ministry_time_entries;
  const settings = data.settings;

  if (!Array.isArray(entries)) {
    throw new Error("Invalid file format: ministry_time_entries must be an array");
  }
  if (!Array.isArray(settings)) {
    throw new Error("Invalid file format: settings must be an array");
  }

  await rxdb.ministry_time.find().remove();

  const existingSettings = await rxdb.settings
    .find({ selector: { feature: MINISTRY_TIME_FEATURE } })
    .exec();
  await Promise.all(existingSettings.map((doc) => doc.remove()));

  if (entries.length > 0) {
    await rxdb.ministry_time.bulkInsert(entries);
  }
  if (settings.length > 0) {
    await rxdb.settings.bulkInsert(settings);
  }
}

export function generateMinistryTimeExportFilename(): string {
  const date = new Date().toISOString().split("T")[0];
  return `ministry-time-${date}.json`;
}
