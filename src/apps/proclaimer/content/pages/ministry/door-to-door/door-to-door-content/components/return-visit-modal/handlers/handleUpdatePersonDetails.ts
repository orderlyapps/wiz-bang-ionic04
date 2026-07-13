import { returnVisitCollection } from "@shared/database/collections/return-visit";

export type PersonDetails = {
  first_name: string;
  last_name: string;
  phone_number: string;
  notes: string;
};

export function handleUpdatePersonDetails(id: string, details: PersonDetails): void {
  returnVisitCollection.update(id, (draft) => {
    draft.first_name = details.first_name;
    draft.last_name = details.last_name;
    draft.phone_number = details.phone_number;
    draft.notes = details.notes;
  });
}
