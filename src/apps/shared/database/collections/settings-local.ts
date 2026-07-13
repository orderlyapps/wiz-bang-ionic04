import type { SettingsLocal } from "@shared/database/rxdb/collections/settings";
import { rxdb } from "@shared/database/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const settingsLocalCollection = createCollection(
  rxdbCollectionOptions<SettingsLocal>({
    rxCollection: rxdb.settings,
    startSync: true,
  }),
);
