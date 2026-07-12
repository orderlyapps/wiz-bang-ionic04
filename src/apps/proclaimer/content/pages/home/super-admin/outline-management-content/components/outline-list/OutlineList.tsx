import type { Outline } from "@shared/database/schemas/outline";
import { OutlineListItem } from "./outline-list-item/OutlineListItem";

interface OutlineListProps {
  outlines: Outline[];
  on_edit: (outline: Outline) => void;
  on_delete: (id: string) => void;
}

export function OutlineList({ outlines, on_edit, on_delete }: OutlineListProps) {
  if (outlines.length === 0) {
    return <p className="ion-text-center">No outlines found.</p>;
  }

  return (
    <>
      {outlines.map((outline) => (
        <OutlineListItem
          key={outline.id}
          outline={outline}
          on_edit={on_edit}
          on_delete={on_delete}
        />
      ))}
    </>
  );
}
