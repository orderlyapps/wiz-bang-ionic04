import { notAtHomeCollection } from "@shared/database/collections/not-at-home";

export function handleDeleteLetterWritingAddress(id: string): void {
  notAtHomeCollection.delete(id);
}
