import type { StudySection, UseStudiesReturn } from "./useStudies";

const MIN_DURATION = 15;
const MAX_DURATION = 3600;
const NEW_SECTION_DURATION = 210;
const NEW_SECTION_NAME = "New Section";

interface UseStudySettingsReturn {
  sections: StudySection[];
  end_time: string;
  rename_section: (section_id: string, name: string) => void;
  update_section_duration: (section_id: string, duration_seconds: number) => void;
  add_section_after: (section_id: string) => void;
  delete_section: (section_id: string) => void;
  set_end_time: (end_time: string) => void;
}

export function useStudySettings(studies: UseStudiesReturn): UseStudySettingsReturn {
  const active_study = studies.active_study;
  const sections = active_study?.sections ?? [];
  const end_time = active_study?.end_time ?? "";

  const rename_section = (section_id: string, name: string) => {
    if (!active_study) return;
    const new_sections = sections.map((s) => (s.id === section_id ? { ...s, name } : s));
    studies.update_active_study(new_sections, end_time);
  };

  const update_section_duration = (section_id: string, duration_seconds: number) => {
    if (!active_study) return;
    const clamped = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration_seconds));
    const new_sections = sections.map((s) =>
      s.id === section_id ? { ...s, duration_seconds: clamped } : s,
    );
    studies.update_active_study(new_sections, end_time);
  };

  const add_section_after = (section_id: string) => {
    if (!active_study) return;
    const idx = sections.findIndex((s) => s.id === section_id);
    if (idx === -1) return;
    const new_section: StudySection = {
      id: crypto.randomUUID(),
      name: NEW_SECTION_NAME,
      duration_seconds: NEW_SECTION_DURATION,
    };
    const new_sections = [...sections];
    new_sections.splice(idx + 1, 0, new_section);
    studies.update_active_study(new_sections, end_time);
  };

  const delete_section = (section_id: string) => {
    if (!active_study) return;
    if (sections.length <= 1) return;
    const new_sections = sections.filter((s) => s.id !== section_id);
    studies.update_active_study(new_sections, end_time);
  };

  const set_end_time = (new_end_time: string) => {
    if (!active_study) return;
    studies.update_active_study(sections, new_end_time);
  };

  return {
    sections,
    end_time,
    rename_section,
    update_section_duration,
    add_section_after,
    delete_section,
    set_end_time,
  };
}
