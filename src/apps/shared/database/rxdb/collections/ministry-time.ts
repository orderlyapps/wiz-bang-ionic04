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

export const MINISTRY_TYPES = [
  "door_to_door",
  "public",
  "cart",
  "return_visit",
  "informal",
  "shop",
  "street",
  "business",
  "rural",
  "ldc",
  "bethel",
  "hlc",
  "school",
] as const;

export type MinistryType = (typeof MINISTRY_TYPES)[number];

export const ministryTimeSchemaLiteral = {
  version: 1,
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
    ministry_type: { type: "string" },
    note: { type: "string" },
    version,
  },
  required: [
    "entry_id",
    "date",
    "start_time",
    "end_time",
    "minutes",
    "ministry_type",
    "note",
    "version",
  ],
} as const;

export const schemaTyped = toTypedRxJsonSchema(ministryTimeSchemaLiteral);

export type MinistryTimeLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
