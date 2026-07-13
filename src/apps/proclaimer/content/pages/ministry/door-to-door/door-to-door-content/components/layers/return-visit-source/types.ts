import type { ReturnVisitLocal } from "@shared/database/rxdb/collections/return-visit";

export type ReturnVisit = ReturnVisitLocal & {
  street: string;
  suburb: string;
};
