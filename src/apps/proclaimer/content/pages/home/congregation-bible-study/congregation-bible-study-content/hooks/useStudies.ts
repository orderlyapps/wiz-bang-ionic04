import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationBibleStudyLocalCollection } from "@shared/database/collections/congregation-bible-study-local";
import { settingsLocalCollection } from "@shared/database/collections/settings-local";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { CongregationBibleStudyLocal } from "@shared/database/rxdb/collections/congregation-bible-study";

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

const DEFAULT_STUDY_NAME = "My Study";
const DEFAULT_END_TIME = "20:37";
const INTRO_DURATION = 45;
const READING_DURATION = 300;
const DISCUSSION_DURATION = 120;
const DIG_DURATION = 120;
const REFLECT_DURATION = 120;
const MEDITATE_DURATION = 150;
const CONCLUSION_DURATION = 45;

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
      name: "Intro",
      duration_seconds: INTRO_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Reading",
      duration_seconds: READING_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Discussion",
      duration_seconds: DISCUSSION_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Dig Q1",
      duration_seconds: DIG_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Dig Q2",
      duration_seconds: DIG_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Dig Q3",
      duration_seconds: DIG_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Dig Q4",
      duration_seconds: DIG_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Reflect Q1",
      duration_seconds: REFLECT_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Reflect Q2",
      duration_seconds: REFLECT_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Reflect Q3",
      duration_seconds: REFLECT_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Meditate Q1",
      duration_seconds: MEDITATE_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Meditate Q2",
      duration_seconds: MEDITATE_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Meditate Q3",
      duration_seconds: MEDITATE_DURATION,
    },
    {
      id: crypto.randomUUID(),
      name: "Conclusion",
      duration_seconds: CONCLUSION_DURATION,
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

type StudyDoc = CongregationBibleStudyLocal & { $key: string };

function toStudy(doc: StudyDoc): Study {
  return {
    study_id: doc.study_id,
    name: doc.name,
    sections: parseSections(doc.sections),
    end_time: doc.end_time ?? "",
    $key: doc.$key,
  };
}

function insertStudy(name: string): string {
  const study_id = crypto.randomUUID();
  congregationBibleStudyLocalCollection.insert({
    study_id,
    name,
    sections: JSON.stringify(createDefaultSections()),
    end_time: DEFAULT_END_TIME,
    version: versionData(),
  });
  return study_id;
}

function persistActiveId(has_active_setting: boolean, study_id: string) {
  if (has_active_setting) {
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

  const studies = ((docs as StudyDoc[] | undefined) ?? []).map(toStudy);
  const active_setting = (
    settings_docs as { setting_id: string; value: string }[] | undefined
  )?.find((s) => s.setting_id === ACTIVE_SETTING_ID);
  const active_id = active_setting?.value ?? "";

  const [is_loaded, setIsLoaded] = useState(false);
  // Guards against duplicate auto-creation while an insert round-trips through RxDB.
  const creating_ref = useRef(false);

  useEffect(() => {
    if (!docs) return;
    setIsLoaded(true);
  }, [docs]);

  const has_active_setting = Boolean(active_setting);

  // First load with zero studies -> auto-create default study and select it.
  useEffect(() => {
    if (!is_loaded) return;
    if (studies.length === 0) {
      if (creating_ref.current) return;
      creating_ref.current = true;
      const new_id = insertStudy(DEFAULT_STUDY_NAME);
      persistActiveId(has_active_setting, new_id);
      return;
    }
    creating_ref.current = false;
    // Active id missing or pointing at deleted study -> fall back to first study.
    const exists = studies.some((s) => s.study_id === active_id);
    if (!exists) {
      persistActiveId(has_active_setting, studies[0].study_id);
    }
  }, [is_loaded, studies, active_id, has_active_setting]);

  const create_study = (name: string) => {
    const new_id = insertStudy(name);
    persistActiveId(has_active_setting, new_id);
  };

  const rename_study = (study_id: string, name: string) => {
    const target = studies.find((s) => s.study_id === study_id);
    if (!target) return;
    congregationBibleStudyLocalCollection.update(target.$key, (draft) => {
      draft.name = name;
      draft.version.updated_at = Date.now();
    });
  };

  const delete_study = (study_id: string) => {
    const target = studies.find((s) => s.study_id === study_id);
    if (!target) return;
    congregationBibleStudyLocalCollection.delete(target.$key);

    const remaining = studies.filter((s) => s.study_id !== study_id);
    if (remaining.length === 0) {
      // Auto-create a fresh default study so the timer is never without sections.
      creating_ref.current = true;
      const new_id = insertStudy(DEFAULT_STUDY_NAME);
      persistActiveId(has_active_setting, new_id);
    } else if (study_id === active_id) {
      persistActiveId(has_active_setting, remaining[0].study_id);
    }
  };

  const select_study = (study_id: string) => {
    const exists = studies.some((s) => s.study_id === study_id);
    if (!exists) return;
    persistActiveId(has_active_setting, study_id);
  };

  const update_active_study = (sections: StudySection[], end_time: string) => {
    const target = studies.find((s) => s.study_id === active_id);
    if (!target) return;
    congregationBibleStudyLocalCollection.update(target.$key, (draft) => {
      draft.sections = JSON.stringify(sections);
      draft.end_time = end_time;
      draft.version.updated_at = Date.now();
    });
  };

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
