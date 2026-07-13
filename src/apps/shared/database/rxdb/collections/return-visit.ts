import { toTypedRxJsonSchema, type ExtractDocumentTypeFromTypedRxJsonSchema } from "rxdb";

const visitLogEntry = {
  type: "object",
  properties: {
    id: { type: "string" },
    visited_at: { type: "string" },
    notes: { type: "string" },
  },
  required: ["id", "visited_at", "notes"],
} as const;

export const returnVisitSchemaLiteral = {
  version: 1,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    created_at: { type: "string" },
    coordinates: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "number" },
    },
    congregation_id: { type: "string" },
    suburb_id: { type: "string" },
    street_id: { type: "string" },
    house_number: { type: "string" },
    unit_number: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    phone_number: { type: "string" },
    notes: { type: "string" },
    visit_log: {
      type: "array",
      items: visitLogEntry,
    },
    match_data: {
      type: "object",
      properties: {},
    },
  },
  required: [
    "id",
    "coordinates",
    "congregation_id",
    "suburb_id",
    "street_id",
    "house_number",
    "first_name",
    "last_name",
    "phone_number",
    "notes",
    "visit_log",
    "match_data",
  ],
} as const;

export const schemaTyped = toTypedRxJsonSchema(returnVisitSchemaLiteral);

export type ReturnVisitLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
