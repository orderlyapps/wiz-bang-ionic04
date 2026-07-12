import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { cleanMinorSchema } from "@shared/database/schemas/clean-minor";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "clean_minor",
  queryKey: ["clean_minor"],
  queryClient,
  schema: cleanMinorSchema,
  getKey: (row) => makeCompositeKey(row.week_id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("clean_minor").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("clean_minor").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_minor")
        .update(mutation.modified)
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_minor")
        .delete()
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const cleanMinorCollection = createCollection({
  ...persistedOptions,
  schema: cleanMinorSchema,
});
