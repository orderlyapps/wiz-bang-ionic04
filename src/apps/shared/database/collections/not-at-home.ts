import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { notAtHomeSchema } from "@shared/database/schemas/not-at-home";

const baseOptions = queryCollectionOptions({
  id: "not_at_home",
  queryKey: ["not_at_home"],
  queryClient,
  refetchInterval: 20_000,
  schema: notAtHomeSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("not_at_home").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("not_at_home").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("not_at_home")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("not_at_home").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});

export const notAtHomeCollection = createCollection({
  ...baseOptions,
  schema: notAtHomeSchema,
});
