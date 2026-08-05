import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { mapLogSchema } from "@shared/database/schemas/map-log";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "map_log",
  queryKey: ["map_log"],
  queryClient,
  schema: mapLogSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    /**
     * PostgREST caps responses at a default of 1000 rows per request, so a
     * single `.select("*")` silently truncates once the table grows. We
     * page through the result set explicitly so rows are not lost behind
     * the cap.
     */
    const PAGE_SIZE = 1000;
    const all: MapLogRow[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from("map_log")
        .select("*")
        .order("checked_out_at", { ascending: false })
        .order("id", { ascending: true })
        .range(from, to);

      if (error) {
        throw new Error(`Failed to fetch map_log: ${error.message}`);
      }

      if (!data || data.length === 0) break;
      all.push(...data);
      if (data.length < PAGE_SIZE) break;
    }
    return all;
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("map_log").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("map_log")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("map_log").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const mapLogCollection = createCollection({
  ...persistedOptions,
  schema: mapLogSchema,
});
