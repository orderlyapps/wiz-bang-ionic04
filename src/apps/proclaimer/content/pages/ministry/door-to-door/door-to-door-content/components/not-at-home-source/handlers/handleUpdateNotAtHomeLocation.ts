import { notAtHomeCollection } from "@shared/database/collections/not-at-home";
import type { NotAtHome } from "../types";

export function handleUpdateNotAtHomeLocation(
  records: NotAtHome[],
  coordinates: [number, number],
): void {
  for (const record of records) {
    notAtHomeCollection.update(record.id, (draft) => {
      draft.coordinates = coordinates;
    });
  }
}
