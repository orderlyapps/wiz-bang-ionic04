import type { MinistryTimeLocal } from "@shared/database/rxdb/collections/ministry-time";
import { rxdb } from "@shared/database/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const ministryTimeLocalCollection = createCollection(
  rxdbCollectionOptions<MinistryTimeLocal>({
    rxCollection: rxdb.ministry_time,
    startSync: true,
  }),
);
