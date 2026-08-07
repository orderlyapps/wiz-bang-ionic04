import { useStudies } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";
import { useStudySettings } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudySettings";
import { StudySettingsModal } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/components/study-settings-modal/StudySettingsModal";
import { StudiesModal } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/components/studies-modal/StudiesModal";
import { CongregationBibleStudyTimer } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/components/congregation-bible-study-timer/CongregationBibleStudyTimer";

interface CongregationBibleStudyContentProps {
  show_settings: boolean;
  on_dismiss_settings: () => void;
  show_studies: boolean;
  on_dismiss_studies: () => void;
}

export function CongregationBibleStudyContent({
  show_settings,
  on_dismiss_settings,
  show_studies,
  on_dismiss_studies,
}: CongregationBibleStudyContentProps) {
  const studies = useStudies();
  const settings = useStudySettings(studies);

  return (
    <>
      <StudiesModal
        is_open={show_studies}
        on_dismiss={on_dismiss_studies}
        studies={studies.studies}
        active_study_id={studies.active_study?.study_id ?? ""}
        on_select={studies.select_study}
        on_create={studies.create_study}
        on_rename={studies.rename_study}
        on_delete={studies.delete_study}
      />
      <StudySettingsModal
        is_open={show_settings}
        on_dismiss={on_dismiss_settings}
        sections={settings.sections}
        end_time={settings.end_time}
        on_update_duration={settings.update_section_duration}
        on_add_after={settings.add_section_after}
        on_delete={settings.delete_section}
        on_rename={settings.rename_section}
        on_set_end_time={settings.set_end_time}
      />
      <CongregationBibleStudyTimer
        study_id={studies.active_study?.study_id ?? ""}
        sections={settings.sections}
        end_time={settings.end_time}
      />
    </>
  );
}
