import { useState } from "react";
import { IonContent, IonList, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import type { Study } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";
import { StudyListItem } from "./components/study-list-item/StudyListItem";

interface StudiesModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  studies: Study[];
  active_study_id: string;
  on_select: (study_id: string) => void;
  on_create: (name: string) => void;
  on_rename: (study_id: string, name: string) => void;
  on_delete: (study_id: string) => void;
}

export function StudiesModal({
  is_open,
  on_dismiss,
  studies,
  active_study_id,
  on_select,
  on_create,
  on_rename,
  on_delete,
}: StudiesModalProps) {
  const [new_name, setNewName] = useState("");

  const handle_select = (study_id: string) => {
    on_select(study_id);
    on_dismiss();
  };

  const handle_create = (name: string) => {
    if (name) on_create(name);
    setNewName("");
  };

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Studies</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset>
          {studies.map((study) => (
            <StudyListItem
              key={study.study_id}
              study={study}
              is_active={study.study_id === active_study_id}
              on_select={handle_select}
              on_rename={on_rename}
              on_delete={on_delete}
            />
          ))}
        </IonList>
        <AlertTextInput
          label="New study"
          value={new_name}
          placeholder="Study name"
          on_change={handle_create}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
