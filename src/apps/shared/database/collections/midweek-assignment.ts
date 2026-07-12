import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { midweekAssignmentSchema } from "@shared/database/schemas/midweek-assignment";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "midweek_assignment",
  queryKey: ["midweek_assignment"],
  queryClient,
  schema: midweekAssignmentSchema,
  getKey: (row) => makeCompositeKey(row.assignment_id, row.congregation_id, row.week_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("midweek_assignment").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("midweek_assignment").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { assignment_id, congregation_id, week_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_assignment")
        .update(mutation.modified)
        .match({ assignment_id, congregation_id, week_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { assignment_id, congregation_id, week_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_assignment")
        .delete()
        .match({ assignment_id, congregation_id, week_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const midweekAssignmentCollection = createCollection({
  ...persistedOptions,
  schema: midweekAssignmentSchema,
});
