import { IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonButton } from "@ionic/react";
import { camera, cameraOutline } from "ionicons/icons";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

type Props = {
  is_map: boolean;
  screenshotMode: boolean;
  can_add: boolean;
  hasPendingChanges: boolean;
  onToggleScreenshot: () => void;
  onAddClick: () => void;
  onCloseMenu: () => void;
  onDeselect: () => void;
};

export function MapMenuHeader({
  is_map,
  screenshotMode,
  can_add,
  hasPendingChanges,
  onToggleScreenshot,
  onAddClick,
  onCloseMenu,
  onDeselect,
}: Props) {
  const handle_close = () => {
    onCloseMenu();
    onDeselect();
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <CloseIconButton
            color="medium"
            skip_confirmation={!hasPendingChanges}
            alert_header="Unsaved Changes"
            alert_message="You have unsaved changes. Are you sure you want to change map?"
            confirm_text="Finish"
            on_click={handle_close}
          />
        </IonButtons>
        <IonTitle>Edit</IonTitle>
        <IonButtons slot="end">
          {is_map && (
            <IonButton
              fill="clear"
              color={screenshotMode ? "primary" : "medium"}
              onClick={onToggleScreenshot}
            >
              <IonIcon slot="icon-only" icon={screenshotMode ? camera : cameraOutline} />
            </IonButton>
          )}
          {can_add && !screenshotMode && <AddIconButton on_click={onAddClick} />}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
