import { useState, useEffect, useCallback } from "react";
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
  const [sections, setSections] = useState<StudySection[]>(studies.active_study?.sections ?? []);
  const [end_time, setEndTime] = useState(studies.active_study?.end_time ?? "");

  const active_study_id = studies.active_study?.study_id;

  useEffect(() => {
    setSections(studies.active_study?.sections ?? []);
    setEndTime(studies.active_study?.end_time ?? "");
  }, [active_study_id, studies.active_study?.sections, studies.active_study?.end_time]);

  const rename_section = useCallback(
    (section_id: string, name: string) => {
      if (!studies.active_study) return;
      setSections((prev) => {
        const new_sections = prev.map((s) => (s.id === section_id ? { ...s, name } : s));
        studies.update_active_study(new_sections, end_time);
        return new_sections;
      });
    },
    [studies, end_time],
  );

  const update_section_duration = useCallback(
    (section_id: string, duration_seconds: number) => {
      if (!studies.active_study) return;
      const clamped = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration_seconds));
      setSections((prev) => {
        const new_sections = prev.map((s) =>
          s.id === section_id ? { ...s, duration_seconds: clamped } : s,
        );
        studies.update_active_study(new_sections, end_time);
        return new_sections;
      });
    },
    [studies, end_time],
  );

  const add_section_after = useCallback(
    (section_id: string) => {
      if (!studies.active_study) return;
      setSections((prev) => {
        const idx = prev.findIndex((s) => s.id === section_id);
        if (idx === -1) return prev;
        const new_section: StudySection = {
          id: crypto.randomUUID(),
          name: NEW_SECTION_NAME,
          duration_seconds: NEW_SECTION_DURATION,
        };
        const new_sections = [...prev];
        new_sections.splice(idx + 1, 0, new_section);
        studies.update_active_study(new_sections, end_time);
        return new_sections;
      });
    },
    [studies, end_time],
  );

  const delete_section = useCallback(
    (section_id: string) => {
      if (!studies.active_study) return;
      setSections((prev) => {
        if (prev.length <= 1) return prev;
        const new_sections = prev.filter((s) => s.id !== section_id);
        studies.update_active_study(new_sections, end_time);
        return new_sections;
      });
    },
    [studies, end_time],
  );

  const set_end_time = useCallback(
    (new_end_time: string) => {
      if (!studies.active_study) return;
      setEndTime(new_end_time);
      studies.update_active_study(sections, new_end_time);
    },
    [studies, sections],
  );

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
