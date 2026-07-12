import { notAtHomeCollection } from "@shared/database/collections/not-at-home";

export function handleDeleteNotAtHome(id: string): void {
  notAtHomeCollection.delete(id);
}
