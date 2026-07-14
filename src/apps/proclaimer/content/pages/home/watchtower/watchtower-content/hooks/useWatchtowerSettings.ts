import { useState, useEffect, useCallback } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { watchtowerLocalCollection } from "@shared/database/collections/watchtower-local";

export type SectionType = "intro" | "numbered" | "review" | "summary";

export interface WatchtowerSection {
  id: string;
  type: SectionType;
  number: number | null;
  duration_seconds: number;
  merged_count: number;
}

const DEFAULT_NUMBERED_DURATION = 150;
const DEFAULT_OTHER_DURATION = 90;
const SETTING_ID = "default";

function createDefaultSections(): WatchtowerSection[] {
  const sections: WatchtowerSection[] = [];

  sections.push({
    id: "intro",
    type: "intro",
    number: null,
    duration_seconds: DEFAULT_OTHER_DURATION,
    merged_count: 0,
  });

  for (let i = 1; i <= 18; i++) {
    sections.push({
      id: `numbered-${i}`,
      type: "numbered",
      number: i,
      duration_seconds: DEFAULT_NUMBERED_DURATION,
      merged_count: 0,
    });
  }

  for (let i = 1; i <= 3; i++) {
    sections.push({
      id: `review-${i}`,
      type: "review",
      number: i,
      duration_seconds: DEFAULT_OTHER_DURATION,
      merged_count: 0,
    });
  }

  sections.push({
    id: "summary",
    type: "summary",
    number: null,
    duration_seconds: DEFAULT_OTHER_DURATION,
    merged_count: 0,
  });

  return sections;
}

export function createDefaultWatchtowerSections(): WatchtowerSection[] {
  return createDefaultSections();
}

function renumberSections(sections: WatchtowerSection[]): WatchtowerSection[] {
  let numbered_number = 0;
  let review_number = 0;

  return sections.map((section) => {
    if (section.type === "numbered") {
      numbered_number += 1;
      const renumbered_section = {
        ...section,
        id: `numbered-${numbered_number}`,
        number: numbered_number,
      };
      numbered_number += section.merged_count;
      return renumbered_section;
    }

    if (section.type === "review") {
      review_number += 1;
      return { ...section, id: `review-${review_number}`, number: review_number };
    }

    return section;
  });
}

function getSectionLabel(section: WatchtowerSection): string {
  switch (section.type) {
    case "intro":
      return "Intro";
    case "numbered":
      return section.merged_count > 0
        ? `Section ${section.number}-${(section.number ?? 0) + section.merged_count}`
        : `Section ${section.number}`;
    case "review":
      return `Review ${section.number}`;
    case "summary":
      return "Summary";
  }
}

export function getSectionLabelExported(section: WatchtowerSection): string {
  return getSectionLabel(section);
}

interface UseWatchtowerSettingsReturn {
  sections: WatchtowerSection[];
  end_time: string | null;
  is_loaded: boolean;
  update_section_duration: (section_id: string, duration_seconds: number) => void;
  add_section_after: (section_id: string) => void;
  delete_section: (section_id: string) => void;
  merge_with_next: (section_id: string) => void;
  unmerge_section: (section_id: string) => void;
  set_end_time: (end_time: string | null) => void;
  reset_to_defaults: () => void;
}

export function useWatchtowerSettings(): UseWatchtowerSettingsReturn {
  const { data: settings } = useLiveQuery((q) => q.from({ w: watchtowerLocalCollection }));
  const [sections, setSections] = useState<WatchtowerSection[]>(createDefaultSections());
  const [end_time, setEndTime] = useState<string | null>(null);
  const [is_loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!settings) return;
    const doc = settings.find((s) => s.setting_id === SETTING_ID);
    if (doc) {
      try {
        const parsed = JSON.parse(doc.sections) as WatchtowerSection[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSections(parsed);
        }
        setEndTime(doc.end_time || null);
      } catch {
        // keep defaults on parse error
      }
    }
    setIsLoaded(true);
  }, [settings]);

  const persist = useCallback(
    (new_sections: WatchtowerSection[], new_end_time: string | null) => {
      const existing = settings?.find((s) => s.setting_id === SETTING_ID);
      const sections_json = JSON.stringify(new_sections);
      if (existing) {
        watchtowerLocalCollection.update(existing.$key, (draft) => {
          draft.sections = sections_json;
          draft.end_time = new_end_time ?? "";
        });
      } else {
        watchtowerLocalCollection.insert({
          setting_id: SETTING_ID,
          sections: sections_json,
          end_time: new_end_time ?? "",
          version: {
            created_by: "",
            updated_by: "",
            created_at: Date.now(),
            updated_at: Date.now(),
          },
        });
      }
    },
    [settings],
  );

  const update_section_duration = useCallback(
    (section_id: string, duration_seconds: number) => {
      const clamped = Math.max(15, Math.min(600, duration_seconds));
      const new_sections = sections.map((s) =>
        s.id === section_id ? { ...s, duration_seconds: clamped } : s,
      );
      setSections(new_sections);
      persist(new_sections, end_time);
    },
    [sections, end_time, persist],
  );

  const add_section_after = useCallback(
    (section_id: string) => {
      const idx = sections.findIndex((s) => s.id === section_id);
      if (idx === -1) return;
      const target = sections[idx];
      if (target.type !== "numbered" && target.type !== "review") return;

      const new_number = (target.number ?? 0) + 1;
      const new_id = `${target.type}-${new_number}-${Date.now()}`;
      const new_section: WatchtowerSection = {
        id: new_id,
        type: target.type,
        number: new_number,
        duration_seconds:
          target.type === "numbered" ? DEFAULT_NUMBERED_DURATION : DEFAULT_OTHER_DURATION,
        merged_count: 0,
      };

      const new_sections = [...sections];
      new_sections.splice(idx + 1, 0, new_section);

      const renumbered_sections = renumberSections(new_sections);

      setSections(renumbered_sections);
      persist(renumbered_sections, end_time);
    },
    [sections, end_time, persist],
  );

  const delete_section = useCallback(
    (section_id: string) => {
      const idx = sections.findIndex((s) => s.id === section_id);
      if (idx === -1) return;
      const target = sections[idx];
      if (target.type !== "numbered" && target.type !== "review") return;

      const new_sections = sections.filter((s) => s.id !== section_id);

      const renumbered_sections = renumberSections(new_sections);

      setSections(renumbered_sections);
      persist(renumbered_sections, end_time);
    },
    [sections, end_time, persist],
  );

  const merge_with_next = useCallback(
    (section_id: string) => {
      const idx = sections.findIndex((s) => s.id === section_id);
      if (idx === -1) return;
      const target = sections[idx];
      if (target.type !== "numbered") return;
      if (idx + 1 >= sections.length) return;
      if (sections[idx + 1].type !== "numbered") return;

      const new_sections = [...sections];
      const next = new_sections[idx + 1];
      const absorbed_count = next.merged_count + 1;
      new_sections[idx] = {
        ...target,
        merged_count: target.merged_count + absorbed_count,
        duration_seconds: DEFAULT_NUMBERED_DURATION,
      };
      new_sections.splice(idx + 1, 1);
      const renumbered_sections = renumberSections(new_sections);

      setSections(renumbered_sections);
      persist(renumbered_sections, end_time);
    },
    [sections, end_time, persist],
  );

  const unmerge_section = useCallback(
    (section_id: string) => {
      const idx = sections.findIndex((s) => s.id === section_id);
      if (idx === -1) return;
      const target = sections[idx];
      if (target.type !== "numbered" || target.merged_count <= 0) return;

      const merged_count = target.merged_count;

      const unmerged: WatchtowerSection[] = [];
      for (let i = 0; i <= merged_count; i++) {
        unmerged.push({
          id: `${target.id}-unmerged-${i}`,
          type: "numbered",
          number: (target.number ?? 0) + i,
          duration_seconds: DEFAULT_NUMBERED_DURATION,
          merged_count: 0,
        });
      }

      const new_sections = [...sections];
      new_sections.splice(idx, 1, ...unmerged);

      const renumbered_sections = renumberSections(new_sections);

      setSections(renumbered_sections);
      persist(renumbered_sections, end_time);
    },
    [sections, end_time, persist],
  );

  const set_end_time = useCallback(
    (new_end_time: string | null) => {
      setEndTime(new_end_time);
      persist(sections, new_end_time);
    },
    [sections, persist],
  );

  const reset_to_defaults = useCallback(() => {
    const defaults = createDefaultSections();
    setSections(defaults);
    persist(defaults, end_time);
  }, [end_time, persist]);

  return {
    sections,
    end_time,
    is_loaded,
    update_section_duration,
    add_section_after,
    delete_section,
    merge_with_next,
    unmerge_section,
    set_end_time,
    reset_to_defaults,
  };
}
