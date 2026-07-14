import { IonItem, IonLabel, IonList, IonIcon, IonContent } from "@ionic/react";
import { add, trash, gitMerge, gitBranch } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeIncrementInput } from "@ui/components/inputs/increment-input/time-increment-input/TimeIncrementInput";
import type { WatchtowerSection } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerSettings";
import { SectionEditHeader } from "./components/section-edit-header/SectionEditHeader";
import { SectionEditNavigation } from "./components/section-edit-navigation/SectionEditNavigation";

interface SectionEditModalProps {
  section: WatchtowerSection | null;
  sections: WatchtowerSection[];
  is_open: boolean;
  on_dismiss: () => void;
  on_select_section: (section_id: string) => void;
  on_update_duration: (section_id: string, duration_seconds: number) => void;
  on_add_after: (section_id: string) => void;
  on_delete: (section_id: string) => void;
  on_merge_next: (section_id: string) => void;
  on_unmerge: (section_id: string) => void;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder_seconds = seconds % 60;
  return `${minutes}:${remainder_seconds.toString().padStart(2, "0")}`;
}

function getSectionLabel(section: WatchtowerSection): string {
  switch (section.type) {
    case "intro":
      return "Intro";
    case "numbered":
      return section.merged_count > 0
        ? `Paragraph ${section.number}-${(section.number ?? 0) + section.merged_count}`
        : `Paragraph ${section.number}`;
    case "review":
      return `Review ${section.number}`;
    case "summary":
      return "Summary";
  }
}

export function SectionEditModal({
  section,
  sections,
  is_open,
  on_dismiss,
  on_select_section,
  on_update_duration,
  on_add_after,
  on_delete,
  on_merge_next,
  on_unmerge,
}: SectionEditModalProps) {
  if (!section) return null;

  const is_numbered = section.type === "numbered";
  const is_review = section.type === "review";
  const same_type = sections.filter((s) => s.type === section.type);
  const is_last_of_type =
    (is_numbered || is_review) && same_type[same_type.length - 1].id === section.id;
  const can_add = is_last_of_type;
  const can_delete = is_last_of_type && same_type.length > 1;
  const can_merge = is_numbered && !is_last_of_type;
  const can_unmerge = is_numbered && section.merged_count > 0;
  const section_index = sections.findIndex((item) => item.id === section.id);
  const previous_section = sections[section_index - 1];
  const next_section = sections[section_index + 1];
  const total_duration = sections.reduce((total, item) => total + item.duration_seconds, 0);

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <SectionEditHeader title={getSectionLabel(section)} on_dismiss={on_dismiss} />
      <IonContent className="ion-padding">
        <div className="ion-text-center ion-padding-bottom">
          <IonLabel color="medium">Total: {formatDuration(total_duration)}</IonLabel>
        </div>
        <SectionEditNavigation
          has_previous={Boolean(previous_section)}
          has_next={Boolean(next_section)}
          on_previous={() => previous_section && on_select_section(previous_section.id)}
          on_next={() => next_section && on_select_section(next_section.id)}
        />
        <TimeIncrementInput
          label="Duration"
          value_seconds={section.duration_seconds}
          min_seconds={15}
          max_seconds={600}
          step_seconds={15}
          on_change={(value) => on_update_duration(section.id, value)}
        />

        {can_add && (
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
        )}

        {can_merge && (
          <IonList inset>
            <IonItem button detail={false} onClick={() => on_merge_next(section.id)}>
              <IonIcon slot="start" icon={gitMerge} />
              <IonLabel>Merge with next</IonLabel>
            </IonItem>
          </IonList>
        )}

        {can_unmerge && (
          <IonList inset>
            <IonItem button detail={false} onClick={() => on_unmerge(section.id)}>
              <IonIcon slot="start" icon={gitBranch} />
              <IonLabel>Unmerge sections</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
