import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { outlineCollection } from "@shared/database/collections/outline";
import type { Outline } from "@shared/database/schemas/outline";

export function useOutlineManagement() {
  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const [is_form_open, set_is_form_open] = useState(false);
  const [editing_outline, set_editing_outline] = useState<Outline | null>(null);
  const [delete_outline_id, set_delete_outline_id] = useState<string | null>(null);

  const outlines = (all_outlines as Outline[] | undefined) ?? [];

  function open_new() {
    set_editing_outline(null);
    set_is_form_open(true);
  }

  function open_edit(outline: Outline) {
    set_editing_outline(outline);
    set_is_form_open(true);
  }

  function close_form() {
    set_is_form_open(false);
    set_editing_outline(null);
  }

  async function save_outline(outline: Outline) {
    const existing = outlines.find((o) => o.id === outline.id);

    if (editing_outline && editing_outline.id !== outline.id) {
      outlineCollection.delete(editing_outline.id);
    }

    if (existing) {
      outlineCollection.update(outline.id, (draft) => {
        draft.theme = outline.theme;
      });
    } else {
      const tx = outlineCollection.insert(outline);
      await tx.isPersisted.promise;
    }

    close_form();
  }

  function request_delete(id: string) {
    set_delete_outline_id(id);
  }

  function cancel_delete() {
    set_delete_outline_id(null);
  }

  function confirm_delete() {
    if (delete_outline_id) {
      outlineCollection.delete(delete_outline_id);
    }
    set_delete_outline_id(null);
  }

  return {
    outlines,
    is_form_open,
    editing_outline,
    delete_outline_id,
    open_new,
    open_edit,
    close_form,
    save_outline,
    request_delete,
    cancel_delete,
    confirm_delete,
  };
}
