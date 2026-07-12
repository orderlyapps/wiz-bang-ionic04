import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { congregationAdminSchema } from "@shared/database/schemas/congregation-admin";

const baseOptions = queryCollectionOptions({
  id: "congregation_admin",
  queryKey: ["congregation_admin"],
  queryClient,
  schema: congregationAdminSchema,
  getKey: (row) => `${row.auth_user_id}:${row.congregation_id}`,
  queryFn: async () => {
    const { data, error } = await supabase.from("congregation_admin").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("congregation_admin").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("congregation_admin")
        .update(mutation.modified)
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("congregation_admin")
        .delete()
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
});

export const congregationAdminCollection = createCollection({
  ...baseOptions,
  schema: congregationAdminSchema,
});
