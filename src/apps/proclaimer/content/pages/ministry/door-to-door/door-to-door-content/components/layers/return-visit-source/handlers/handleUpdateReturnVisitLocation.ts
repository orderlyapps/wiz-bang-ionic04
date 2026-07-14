import { returnVisitCollection } from "@shared/database/collections/return-visit";
import type { ReturnVisit } from "../types";

export function handleUpdateReturnVisitLocation(
  records: ReturnVisit[],
  coordinates: [number, number],
): void {
  for (const record of records) {
    returnVisitCollection.update(record.id, (draft) => {
      draft.coordinates = coordinates;
    });
  }
}
