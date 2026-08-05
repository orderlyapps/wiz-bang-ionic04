import { useState, useEffect, useCallback } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationBibleStudyLocalCollection } from "@shared/database/collections/congregation-bible-study-local";
import { settingsLocalCollection } from "@shared/database/collections/settings-local";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export interface StudySection {
  id: string;
  name: string;
  duration_seconds: number;
}

export interface Study {
  study_id: string;
  name: string;
  sections: StudySection[];
  end_time: string;
  $key: string;
}

const ACTIVE_FEATURE = "congregation_bible_study";
const ACTIVE_KEY = "active_study_id";
const ACTIVE_SETTING_ID = makeCompositeKey(ACTIVE_FEATURE, ACTIVE_KEY);

const DEFAULT_SECTION_NAME = "Congregation Bible Study";
const DEFAULT_SECTION_DURATION = 1800;
const DEFAULT_STUDY_NAME = "My Study";

function versionData() {
  const now = Date.now();
  return {
    created_by: "",
    updated_by: "",
    created_at: now,
    updated_at: now,
  };
}

function createDefaultSections(): StudySection[] {
  return [
    {
      id: crypto.randomUUID(),
      name: DEFAULT_SECTION_NAME,
      duration_seconds: DEFAULT_SECTION_DURATION,
    },
  ];
}

function parseSections(raw: string): StudySection[] {
  try {
    const parsed = JSON.parse(raw) as StudySection[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // keep defaults on parse error
  }
  return createDefaultSections();
}

function toStudy(doc: CongregationBibleStudyLocalDoc): Study {
  return {
    study_id: doc.study_id,
    name: doc.name,
    sections: parseSections(doc.sections),
    end_time: doc.end_time ?? "",
    $key: doc.$key,
  };
}

interface CongregationBibleStudyLocalDoc {
  study_id: string;
  name: string;
  sections: string;
  end_time: string;
  $key: string;
}

export interface UseStudiesReturn {
  studies: Study[];
  active_study: Study | null;
  is_loaded: boolean;
  create_study: (name: string) => void;
  rename_study: (study_id: string, name: string) => void;
  delete_study: (study_id: string) => void;
  select_study: (study_id: string) => void;
  update_active_study: (sections: StudySection[], end_time: string) => void;
}

export function useStudies(): UseStudiesReturn {
  const { data: docs } = useLiveQuery((q) => q.from({ s: congregationBibleStudyLocalCollection }));
  const { data: settings_docs } = useLiveQuery((q) => q.from({ s: settingsLocalCollection }));

  const studies = ((docs as CongregationBibleStudyLocalDoc[] | undefined) ?? []).map(toStudy);
  const active_setting = (
    settings_docs as { setting_id: string; value: string }[] | undefined
  )?.find((s) => s.setting_id === ACTIVE_SETTING_ID);
  const active_id = active_setting?.value ?? "";

  const [is_loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!docs) return;
    setIsLoaded(true);
  }, [docs]);

  const persistActiveId = useCallback(
    (study_id: string) => {
      if (active_setting) {
        settingsLocalCollection.update(ACTIVE_SETTING_ID, (draft) => {
          draft.value = study_id;
          draft.version.updated_at = Date.now();
        });
      } else {
        settingsLocalCollection.insert({
          setting_id: ACTIVE_SETTING_ID,
          feature: ACTIVE_FEATURE,
          key: ACTIVE_KEY,
          value: study_id,
          service_year: "",
          version: versionData(),
        });
      }
    },
    [active_setting],
  );

  const insertStudy = useCallback((name: string): string => {
    const study_id = crypto.randomUUID();
    congregationBibleStudyLocalCollection.insert({
      study_id,
      name,
      sections: JSON.stringify(createDefaultSections()),
      end_time: "",
      version: versionData(),
    });
    return study_id;
  }, []);

  // First load with zero studies -> auto-create default study and select it.
  useEffect(() => {
    if (!is_loaded) return;
    if (studies.length === 0) {
      const new_id = insertStudy(DEFAULT_STUDY_NAME);
      persistActiveId(new_id);
      return;
    }
    // Active id missing or pointing at deleted study -> fall back to first study.
    const exists = studies.some((s) => s.study_id === active_id);
    if (!exists) {
      persistActiveId(studies[0].study_id);
    }
  }, [is_loaded, studies, active_id, insertStudy, persistActiveId]);

  const create_study = useCallback(
    (name: string) => {
      const new_id = insertStudy(name);
      persistActiveId(new_id);
    },
    [insertStudy, persistActiveId],
  );

  const rename_study = useCallback(
    (study_id: string, name: string) => {
      const target = studies.find((s) => s.study_id === study_id);
      if (!target) return;
      congregationBibleStudyLocalCollection.update(target.$key, (draft) => {
        draft.name = name;
        draft.version.updated_at = Date.now();
      });
    },
    [studies],
  );

  const delete_study = useCallback(
    (study_id: string) => {
      const target = studies.find((s) => s.study_id === study_id);
      if (!target) return;
      congregationBibleStudyLocalCollection.delete(target.$key);

      const remaining = studies.filter((s) => s.study_id !== study_id);
      if (remaining.length === 0) {
        // Auto-create a fresh default study so the timer is never without sections.
        const new_id = insertStudy(DEFAULT_STUDY_NAME);
        persistActiveId(new_id);
      } else if (study_id === active_id) {
        persistActiveId(remaining[0].study_id);
      }
    },
    [studies, active_id, insertStudy, persistActiveId],
  );

  const select_study = useCallback(
    (study_id: string) => {
      const exists = studies.some((s) => s.study_id === study_id);
      if (!exists) return;
      persistActiveId(study_id);
    },
    [studies, persistActiveId],
  );

  const update_active_study = useCallback(
    (sections: StudySection[], end_time: string) => {
      const target = studies.find((s) => s.study_id === active_id);
      if (!target) return;
      congregationBibleStudyLocalCollection.update(target.$key, (draft) => {
        draft.sections = JSON.stringify(sections);
        draft.end_time = end_time;
        draft.version.updated_at = Date.now();
      });
    },
    [studies, active_id],
  );

  const active_study = studies.find((s) => s.study_id === active_id) ?? null;

  return {
    studies,
    active_study,
    is_loaded,
    create_study,
    rename_study,
    delete_study,
    select_study,
    update_active_study,
  };
}
