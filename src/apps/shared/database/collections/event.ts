import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { eventSchema } from "@shared/database/schemas/event";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "event",
  queryKey: ["event"],
  queryClient,
  schema: eventSchema,
  getKey: (row) => makeCompositeKey(row.id ?? "", row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("event").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("event").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("event")
        .update(mutation.modified)
        .match({ id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { id, congregation_id } = mutation.original;
      const { error } = await supabase.from("event").delete().match({ id, congregation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 3,
});

export const eventCollection = createCollection({
  ...persistedOptions,
  schema: eventSchema,
});
