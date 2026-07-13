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

export const settingsSchemaLiteral = {
  version: 0,
  primaryKey: "setting_id",
  type: "object",
  properties: {
    setting_id: {
      type: "string",
      maxLength: 100,
    },
    feature: { type: "string" },
    key: { type: "string" },
    value: { type: "string" },
    service_year: { type: "string" },
    version,
  },
  required: ["setting_id", "feature", "key", "value", "version"],
} as const;

export const schemaTyped = toTypedRxJsonSchema(settingsSchemaLiteral);

export type SettingsLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
