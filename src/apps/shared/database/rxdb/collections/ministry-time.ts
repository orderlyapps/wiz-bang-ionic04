import { toTypedRxJsonSchema, type ExtractDocumentTypeFromTypedRxJsonSchema } from "rxdb";

const version = {
  type: "object",
  properties: {
    created_by: { type: "string" },
    updated_by: { type: "string" },
    created_at: { type: "number" },
    updated_at: { type: "number" },
  },
  required: ["created_by", "updated_by", "created_at", "updated_at"],
} as const;

export const ministryTimeSchemaLiteral = {
  version: 0,
  primaryKey: "entry_id",
  type: "object",
  properties: {
    entry_id: {
      type: "string",
      maxLength: 100,
    },
    date: { type: "string" },
    start_time: { type: "string" },
    end_time: { type: "string" },
    minutes: { type: "number" },
    note: { type: "string" },
    version,
  },
  required: ["entry_id", "date", "start_time", "end_time", "minutes", "note", "version"],
} as const;

export const schemaTyped = toTypedRxJsonSchema(ministryTimeSchemaLiteral);

export type MinistryTimeLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
