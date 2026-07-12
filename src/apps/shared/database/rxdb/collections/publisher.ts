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

const phone = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      number: { type: "string" },
      label: { type: "string" },
      version,
    },
    required: ["id", "number", "label", "version"],
  },
} as const;

const address = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      label: { type: "string" },
      unit_number: { type: "string" },
      house_number: { type: "string" },
      street: { type: "string" },
      suburb: { type: "string" },
      coordinates: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: { type: "number" },
      },
      version,
    },
    required: ["id", "label", "version"],
  },
} as const;

const email = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      address: { type: "string" },
      label: { type: "string" },
      version,
    },
    required: ["id", "address", "label", "version"],
  },
} as const;

const emergency_contact = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      first_name: { type: "string" },
      last_name: { type: "string" },
      relationship: { type: "string" },
      email,
      phone,
      address,
      version,
    },
    required: ["id", "first_name", "last_name", "relationship", "phone", "version"],
  },
} as const;

export const publisherSchemaLiteral = {
  version: 0,
  primaryKey: "publisher_id",
  type: "object",
  properties: {
    publisher_id: {
      type: "string",
      maxLength: 100, // <- the primary key must have maxLength
    },
    confidential_id: {
      type: "string",
    },
    phone,
    address,
    email,
    emergency_contact,
    photo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          data: { type: "string", maxLength: 204800 },
          mime_type: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
        },
        required: [
          "id",
          "label",
          "data",
          "mime_type",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    birth_date: { type: "string" },
    baptism_date: { type: "string" },
    version,
  },
  required: ["confidential_id", "publisher_id", "version"],
} as const;

export const schemaTyped = toTypedRxJsonSchema(publisherSchemaLiteral);

export type PublisherLocal = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

export type Version = PublisherLocal["version"];
export type Address = PublisherLocal["address"];
export type Phone = PublisherLocal["phone"];
export type Email = PublisherLocal["email"];
export type EmergencyContact = PublisherLocal["emergency_contact"];
export type Photo = PublisherLocal["photo"];
