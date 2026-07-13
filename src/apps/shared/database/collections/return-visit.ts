import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
import { rxdb } from "@shared/database/rxdb/database";
import type { ReturnVisitLocal } from "@shared/database/rxdb/collections/return-visit";

export const returnVisitCollection = createCollection(
  rxdbCollectionOptions<ReturnVisitLocal>({
    rxCollection: rxdb.return_visit,
    startSync: true,
  }),
);
