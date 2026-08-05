import type { CongregationBibleStudyLocal } from "@shared/database/rxdb/collections/congregation-bible-study";
import { rxdb } from "@shared/database/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const congregationBibleStudyLocalCollection = createCollection(
  rxdbCollectionOptions<CongregationBibleStudyLocal>({
    rxCollection: rxdb.congregation_bible_study,
    startSync: true,
  }),
);
