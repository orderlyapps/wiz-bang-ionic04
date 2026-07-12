import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { weekendParticipationSchema } from "@shared/database/schemas/weekend-participation";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "weekend_participation",
  queryKey: ["weekend_participation"],
  queryClient,
  schema: weekendParticipationSchema,
  getKey: (row) => makeCompositeKey(row.participant_id, row.participation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("weekend_participation").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("weekend_participation").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("weekend_participation")
        .update(mutation.modified)
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("weekend_participation")
        .delete()
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const weekendParticipationCollection = createCollection({
  ...persistedOptions,
  schema: weekendParticipationSchema,
});
