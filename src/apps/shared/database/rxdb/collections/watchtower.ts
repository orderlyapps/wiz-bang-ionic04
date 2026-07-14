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

export const watchtowerSchemaLiteral = {
  version: 0,
  primaryKey: "setting_id",
  type: "object",
  properties: {
    setting_id: {
      type: "string",
      maxLength: 100,
    },
    sections: { type: "string" },
    end_time: { type: "string" },
    version,
  },
  required: ["setting_id", "sections", "end_time", "version"],
} as const;

export const schemaTyped = toTypedRxJsonSchema(watchtowerSchemaLiteral);

export type WatchtowerLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
