import { useEffect, useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import type { Outline } from "@shared/database/schemas/outline";

interface OutlineFormProps {
  is_open: boolean;
  outline: Outline | null;
  on_save: (outline: Outline) => void;
  on_dismiss: () => void;
}

export function OutlineForm({ is_open, outline, on_save, on_dismiss }: OutlineFormProps) {
  const [id, set_id] = useState(outline?.id ?? "");
  const [theme, set_theme] = useState(outline?.theme ?? "");
  const is_valid = id.trim().length > 0 && theme.trim().length > 0;

  useEffect(() => {
    set_id(outline?.id ?? "");
    set_theme(outline?.theme ?? "");
  }, [outline]);

  function handle_save() {
    if (!is_valid) return;
    on_save({ id: id.trim(), theme: theme.trim() });
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{outline ? "Edit Outline" : "New Outline"}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TextInput label="ID" value={id} placeholder="Outline number" on_change={set_id} />
        <Space size="sm" />
        <TextInput label="Theme" value={theme} placeholder="Outline theme" on_change={set_theme} />
        <Space size="md" />
        <TextButton label="Save" on_click={handle_save} disabled={!is_valid} />
      </IonContent>
    </ResponsiveModal>
  );
}
