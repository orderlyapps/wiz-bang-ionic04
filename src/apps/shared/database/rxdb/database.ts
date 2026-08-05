import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { addRxPlugin, type RxJsonSchema } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { createRxDatabase } from "rxdb/plugins/core";
import {
  publisherSchemaLiteral,
  type PublisherLocal,
} from "@shared/database/rxdb/collections/publisher";
import {
  ministryTimeSchemaLiteral,
  type MinistryTimeLocal,
} from "@shared/database/rxdb/collections/ministry-time";
import {
  settingsSchemaLiteral,
  type SettingsLocal,
} from "@shared/database/rxdb/collections/settings";
import {
  returnVisitSchemaLiteral,
  type ReturnVisitLocal,
} from "@shared/database/rxdb/collections/return-visit";
import {
  watchtowerSchemaLiteral,
  type WatchtowerLocal,
} from "@shared/database/rxdb/collections/watchtower";
import {
  congregationBibleStudySchemaLiteral,
  type CongregationBibleStudyLocal,
} from "@shared/database/rxdb/collections/congregation-bible-study";

addRxPlugin(RxDBMigrationSchemaPlugin);
if (import.meta.env.DEV) addRxPlugin(RxDBDevModePlugin);

const storage = getRxStorageDexie();

export const rxdb = await createRxDatabase({
  name: "mydatabase",
  storage: wrappedValidateAjvStorage({ storage }),
});

await rxdb.addCollections({
  publisher: {
    schema: publisherSchemaLiteral as RxJsonSchema<PublisherLocal>,
  },
  ministry_time: {
    schema: ministryTimeSchemaLiteral as RxJsonSchema<MinistryTimeLocal>,
    migrationStrategies: {
      1: (oldDoc) => ({
        ...oldDoc,
        ministry_type: oldDoc.ministry_type ?? "door_to_door",
      }),
    },
  },
  settings: {
    schema: settingsSchemaLiteral as RxJsonSchema<SettingsLocal>,
  },
  return_visit: {
    schema: returnVisitSchemaLiteral as RxJsonSchema<ReturnVisitLocal>,
    migrationStrategies: {
      1: (oldDoc) => ({
        ...oldDoc,
        first_name: oldDoc.first_name ?? "",
        last_name: oldDoc.last_name ?? "",
        phone_number: oldDoc.phone_number ?? "",
        notes: oldDoc.notes ?? "",
      }),
    },
  },
  watchtower: {
    schema: watchtowerSchemaLiteral as RxJsonSchema<WatchtowerLocal>,
  },
  congregation_bible_study: {
    schema: congregationBibleStudySchemaLiteral as RxJsonSchema<CongregationBibleStudyLocal>,
  },
});

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    try {
      await rxdb.close();
    } catch {
      // Ignore cleanup errors during HMR disposal.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}
