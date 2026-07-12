import type { DoNotCall as DoNotCallBase } from "@shared/database/schemas/do-not-call";

export type DoNotCall = DoNotCallBase & {
  street: string;
  suburb: string;
};
