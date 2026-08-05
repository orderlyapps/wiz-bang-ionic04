import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

interface SectionEditHeaderProps {
  title: string;
  on_dismiss: () => void;
}

export function SectionEditHeader({ title, on_dismiss }: SectionEditHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <CloseIconButton on_click={on_dismiss} skip_confirmation />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
