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

export const congregationBibleStudySchemaLiteral = {
  version: 0,
  primaryKey: "study_id",
  type: "object",
  properties: {
    study_id: {
      type: "string",
      maxLength: 100,
    },
    name: { type: "string" },
    sections: { type: "string" },
    end_time: { type: "string" },
    version,
  },
  required: ["study_id", "name", "sections", "end_time", "version"],
} as const;

export const schemaTyped = toTypedRxJsonSchema(congregationBibleStudySchemaLiteral);

export type CongregationBibleStudyLocal = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
