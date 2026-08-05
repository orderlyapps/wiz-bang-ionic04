import { IonItem, IonLabel, IonNote, IonButtons, IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { RenameIconButton } from "@ui/components/inputs/button/icon/rename/RenameIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import type { Study } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";

interface StudyListItemProps {
  study: Study;
  is_active: boolean;
  on_select: (study_id: string) => void;
  on_rename: (study_id: string, name: string) => void;
  on_delete: (study_id: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function StudyListItem({
  study,
  is_active,
  on_select,
  on_rename,
  on_delete,
}: StudyListItemProps) {
  const total = study.sections.reduce((sum, s) => sum + s.duration_seconds, 0);

  return (
    <IonItem button detail={!is_active} onClick={() => on_select(study.study_id)}>
      <IonLabel>
        <h2>{study.name}</h2>
        <IonNote>{formatDuration(total)}</IonNote>
      </IonLabel>
      {is_active && (
        <IonIcon icon={checkmark} color="primary" slot="end" className="ion-margin-end" />
      )}
      <IonButtons slot="end" onClick={(e) => e.stopPropagation()}>
        <RenameIconButton
          current_value={study.name}
          alert_header="Rename study"
          on_rename={(name) => on_rename(study.study_id, name)}
        />
        <DeleteIconButton
          alert_header="Delete study"
          alert_message={`Delete "${study.name}"? This cannot be undone.`}
          on_click={() => on_delete(study.study_id)}
        />
      </IonButtons>
    </IonItem>
  );
}
