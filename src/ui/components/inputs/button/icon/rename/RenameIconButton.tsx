import { useState } from "react";
import { IonButton, IonIcon, IonAlert } from "@ionic/react";
import { textOutline } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface RenameIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  slot?: string;
  alert_header?: string;
  current_value: string;
  on_rename: (value: string) => void;
}

export function RenameIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  slot,
  alert_header = "Rename",
  current_value,
  on_rename,
}: RenameIconButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

  return (
    <>
      <IonButton
        color={color}
        fill={fill}
        size={size}
        disabled={disabled}
        slot={slot}
        onClick={() => set_show_alert(true)}
      >
        <IonIcon slot="icon-only" icon={textOutline} />
      </IonButton>
      <IonAlert
        isOpen={show_alert}
        header={alert_header}
        inputs={[
          {
            name: "value",
            type: "text",
            value: current_value,
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { value: string }) => {
              const trimmed = data.value.trim();
              if (trimmed) on_rename(trimmed);
            },
          },
        ]}
        onDidDismiss={() => set_show_alert(false)}
      />
    </>
  );
}
