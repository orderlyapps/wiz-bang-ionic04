import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { reportSchema } from "@shared/database/schemas/report";
import type { Report } from "@shared/database/schemas/report";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "report",
  queryKey: ["report"],
  queryClient,
  schema: reportSchema,
  getKey: (row) => makeCompositeKey(row.confidential_id ?? "", row.congregation_id ?? "", row.date),
  queryFn: async () => {
    /**
     * PostgREST caps responses at a default of 1000 rows per request, so a
     * single `.select("*")` silently truncates once the table grows. We
     * page through the result set explicitly so freshly upserted rows are
     * not lost behind the cap (which previously caused "saved values
     * revert on reload" symptoms).
     */
    const PAGE_SIZE = 1000;
    const all: Report[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from("report")
        .select("*")
        .order("date", { ascending: false })
        .order("confidential_id", { ascending: true })
        .range(from, to);

      if (error) {
        throw new Error(`Failed to fetch report: ${error.message}`);
      }

      if (!data || data.length === 0) break;
      all.push(...data);
      if (data.length < PAGE_SIZE) break;
    }
    return all;
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("report").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .update(mutation.modified)
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .delete()
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 4,
});

export const reportCollection = createCollection({
  ...persistedOptions,
  schema: reportSchema,
});
