import type { Publisher } from "@shared/database/schemas/publisher";

export type LetterDivider = { type: "divider"; letter: string; id: string };
export type ListItem = Publisher | LetterDivider;

export function isDivider(item: ListItem): item is LetterDivider {
  return "type" in item && item.type === "divider";
}

export function buildAlphabeticalItems(publishers: Publisher[]): {
  items: ListItem[];
  pinned_ids: Set<string>;
} {
  if (publishers.length <= 20) {
    return { items: publishers, pinned_ids: new Set() };
  }

  const result: ListItem[] = [];
  const pinned_ids = new Set<string>();
  let current_letter = "";

  for (const publisher of publishers) {
    const letter = publisher.last_name.charAt(0).toUpperCase();
    if (letter !== current_letter) {
      current_letter = letter;
      const divider_id = `__divider__${letter}`;
      result.push({ type: "divider", letter, id: divider_id });
      pinned_ids.add(divider_id);
      if (publisher.id) pinned_ids.add(publisher.id);
    }
    result.push(publisher);
  }

  return { items: result, pinned_ids };
}
