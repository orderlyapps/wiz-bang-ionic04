import type { WatchtowerLocal } from "@shared/database/rxdb/collections/watchtower";
import { rxdb } from "@shared/database/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const watchtowerLocalCollection = createCollection(
  rxdbCollectionOptions<WatchtowerLocal>({
    rxCollection: rxdb.watchtower,
    startSync: true,
  }),
);
