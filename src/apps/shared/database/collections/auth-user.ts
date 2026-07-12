import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { authUserSchema } from "@shared/database/schemas/auth-user";

const baseOptions = queryCollectionOptions({
  id: "auth_user",
  queryKey: ["auth_user"],
  queryClient,
  schema: authUserSchema,
  getKey: (row) => row.auth_user_id,
  queryFn: async () => {
    const { data, error } = await supabase.from("auth_user").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("auth_user").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("auth_user")
        .update(mutation.modified)
        .eq("auth_user_id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("auth_user").delete().eq("auth_user_id", mutation.key);
      if (error) throw error;
    }
  },
});

export const authUserCollection = createCollection({
  ...baseOptions,
  schema: authUserSchema,
});
