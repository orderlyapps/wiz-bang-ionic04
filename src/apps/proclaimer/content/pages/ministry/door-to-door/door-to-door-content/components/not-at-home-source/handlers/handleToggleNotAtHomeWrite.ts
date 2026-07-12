import { notAtHomeCollection } from "@shared/database/collections/not-at-home";

export function handleToggleNotAtHomeWrite(id: string, currentWrite: boolean): void {
  notAtHomeCollection.update(id, (draft) => {
    draft.write = !currentWrite;
  });
}
