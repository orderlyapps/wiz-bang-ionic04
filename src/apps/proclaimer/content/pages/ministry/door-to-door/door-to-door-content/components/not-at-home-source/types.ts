import type { NotAtHome as NotAtHomeBase } from "@shared/database/schemas/not-at-home";

export type NotAtHome = NotAtHomeBase & {
  street: string;
  suburb: string;
};
