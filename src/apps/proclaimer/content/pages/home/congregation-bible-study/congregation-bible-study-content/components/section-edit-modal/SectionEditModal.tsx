import { IonItem, IonLabel, IonList, IonIcon, IonContent } from "@ionic/react";
import { add, trash } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TimeIncrementInput } from "@ui/components/inputs/increment-input/time-increment-input/TimeIncrementInput";
import type { StudySection } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";
import { SectionEditHeader } from "./components/section-edit-header/SectionEditHeader";
import { SectionEditNavigation } from "./components/section-edit-navigation/SectionEditNavigation";

interface SectionEditModalProps {
  section: StudySection | null;
  sections: StudySection[];
  is_open: boolean;
  on_dismiss: () => void;
  on_select_section: (section_id: string) => void;
  on_rename: (section_id: string, name: string) => void;
  on_update_duration: (section_id: string, duration_seconds: number) => void;
  on_add_after: (section_id: string) => void;
  on_delete: (section_id: string) => void;
}

export function SectionEditModal({
  section,
  sections,
  is_open,
  on_dismiss,
  on_select_section,
  on_rename,
  on_update_duration,
  on_add_after,
  on_delete,
}: SectionEditModalProps) {
  if (!section) return null;

  const can_delete = sections.length > 1;
  const idx = sections.findIndex((item) => item.id === section.id);
  const previous_section = sections[idx - 1];
  const next_section = sections[idx + 1];

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <SectionEditHeader title={section.name} on_dismiss={on_dismiss} />
      <IonContent className="ion-padding">
        <SectionEditNavigation
          has_previous={Boolean(previous_section)}
          has_next={Boolean(next_section)}
          on_previous={() => previous_section && on_select_section(previous_section.id)}
          on_next={() => next_section && on_select_section(next_section.id)}
        />
        <TextInput
          label="Section name"
          value={section.name}
          on_change={(value) => on_rename(section.id, value)}
        />
        <TimeIncrementInput
          label="Duration"
          value_seconds={section.duration_seconds}
          min_seconds={15}
          max_seconds={3600}
          step_seconds={15}
          on_change={(value) => on_update_duration(section.id, value)}
        />
        <IonList inset>
          <IonItem button detail={false} onClick={() => on_add_after(section.id)}>
            <IonIcon slot="start" icon={add} />
            <IonLabel>Add section after</IonLabel>
          </IonItem>
          {can_delete && (
            <IonItem button detail={false} onClick={() => on_delete(section.id)}>
              <IonIcon slot="start" icon={trash} color="danger" />
              <IonLabel color="danger">Delete section</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
