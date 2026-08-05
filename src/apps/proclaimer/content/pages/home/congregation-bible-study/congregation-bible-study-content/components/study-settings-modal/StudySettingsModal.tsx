import { useState } from "react";
import { IonContent, IonLabel } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import type { StudySection } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";
import { StudySettingsHeader } from "./components/study-settings-header/StudySettingsHeader";
import { StudySettingsSectionList } from "./components/study-settings-section-list/StudySettingsSectionList";
import { SectionEditModal } from "../section-edit-modal/SectionEditModal";

interface StudySettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  sections: StudySection[];
  end_time: string;
  on_update_duration: (section_id: string, duration_seconds: number) => void;
  on_add_after: (section_id: string) => void;
  on_delete: (section_id: string) => void;
  on_rename: (section_id: string, name: string) => void;
  on_set_end_time: (end_time: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function StudySettingsModal({
  is_open,
  on_dismiss,
  sections,
  end_time,
  on_update_duration,
  on_add_after,
  on_delete,
  on_rename,
  on_set_end_time,
}: StudySettingsModalProps) {
  const [editing_section_id, setEditingSectionId] = useState<string | null>(null);
  const editing_section = editing_section_id
    ? (sections.find((s) => s.id === editing_section_id) ?? null)
    : null;
  const total = sections.reduce((sum, s) => sum + s.duration_seconds, 0);

  return (
    <>
      <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
        <StudySettingsHeader on_dismiss={on_dismiss} />
        <IonContent className="ion-padding">
          <div className="ion-text-center ion-padding-bottom">
            <IonLabel color="medium">Total: {formatDuration(total)}</IonLabel>
          </div>
          <TimeInput
            label="End Time"
            value={end_time}
            on_change={(val) => on_set_end_time(val)}
            minute_step={1}
          />
          <StudySettingsSectionList sections={sections} on_select={setEditingSectionId} />
        </IonContent>
      </ResponsiveModal>

      <SectionEditModal
        section={editing_section}
        sections={sections}
        is_open={editing_section !== null}
        on_dismiss={() => setEditingSectionId(null)}
        on_select_section={setEditingSectionId}
        on_rename={on_rename}
        on_update_duration={on_update_duration}
        on_add_after={on_add_after}
        on_delete={on_delete}
      />
    </>
  );
}
