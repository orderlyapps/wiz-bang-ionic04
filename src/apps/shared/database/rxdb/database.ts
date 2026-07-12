import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { addRxPlugin, type RxJsonSchema } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { createRxDatabase } from "rxdb/plugins/core";
import {
  publisherSchemaLiteral,
  type PublisherLocal,
} from "@shared/database/rxdb/collections/publisher";

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
});
