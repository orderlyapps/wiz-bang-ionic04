import {
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
  IonHeader,
  IonContent,
} from "@ionic/react";
import { close, add, trash, gitMerge, gitBranch } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeIncrementInput } from "@ui/components/inputs/increment-input/time-increment-input/TimeIncrementInput";
import type { WatchtowerSection } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerSettings";

interface SectionEditModalProps {
  section: WatchtowerSection | null;
  is_open: boolean;
  on_dismiss: () => void;
  on_update_duration: (section_id: string, duration_seconds: number) => void;
  on_add_after: (section_id: string) => void;
  on_delete: (section_id: string) => void;
  on_merge_next: (section_id: string) => void;
  on_unmerge: (section_id: string) => void;
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

export function SectionEditModal({
  section,
  is_open,
  on_dismiss,
  on_update_duration,
  on_add_after,
  on_delete,
  on_merge_next,
  on_unmerge,
}: SectionEditModalProps) {
  if (!section) return null;

  const is_numbered = section.type === "numbered";
  const is_review = section.type === "review";
  const can_add_or_delete = is_numbered || is_review;
  const can_merge = is_numbered && section.merged_count === 0;
  const can_unmerge = is_numbered && section.merged_count > 0;

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: "56px",
          borderBottom: "1px solid var(--ion-color-light)",
        }}
      >
        <strong style={{ fontSize: "1.1rem" }}>{getSectionLabel(section)}</strong>
        <IonButton fill="clear" onClick={on_dismiss}>
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
      </IonHeader>
      <IonContent className="ion-padding">
        <TimeIncrementInput
          label="Duration"
          value_seconds={section.duration_seconds}
          min_seconds={15}
          max_seconds={600}
          step_seconds={15}
          on_change={(value) => on_update_duration(section.id, value)}
        />

        {can_add_or_delete && (
          <IonList inset>
            <IonItem button detail={false} onClick={() => on_add_after(section.id)}>
              <IonIcon slot="start" icon={add} />
              <IonLabel>Add section after</IonLabel>
            </IonItem>
            <IonItem button detail={false} onClick={() => on_delete(section.id)}>
              <IonIcon slot="start" icon={trash} color="danger" />
              <IonLabel color="danger">Delete section</IonLabel>
            </IonItem>
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
