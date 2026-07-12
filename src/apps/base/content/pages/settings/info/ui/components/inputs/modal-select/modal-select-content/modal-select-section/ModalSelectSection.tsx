import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const COLORS = ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"];

const props = [
  { label: "label", value: "— Display label shown in the InputWrapper row." },
  {
    label: "display_value",
    value: "— String shown as the current value. Pass an empty string to show the placeholder.",
  },
  {
    label: "placeholder",
    value: '— Fallback text shown when display_value is empty. Defaults to "Select...".',
  },
  { label: "disabled", value: "— Disables the trigger. Defaults to false." },
  {
    label: "on_open",
    value: "— Called when the trigger is tapped. The consumer controls the modal — open it here.",
  },
];

export function ModalSelectSection() {
  const [color, set_color] = useState<string | null>(null);
  const [color_open, set_color_open] = useState(false);

  return (
    <ComponentSection
      title="Modal Select"
      description="A single-value styled trigger (InputWrapper + chevron) that fires on_open when tapped. The consumer owns the modal — pair with ResponsiveModal or any overlay."
      props={props}
    >
      <ModalSelect
        label="Favourite Color"
        display_value={color ?? ""}
        placeholder="Choose a color"
        on_open={() => set_color_open(true)}
      />
      <ResponsiveModal isOpen={color_open} onDidDismiss={() => set_color_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pick a Color</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => set_color_open(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {COLORS.map((c) => (
              <IonItem
                key={c}
                button
                detail={false}
                onClick={() => {
                  set_color(c);
                  set_color_open(false);
                }}
              >
                <IonLabel>{c}</IonLabel>
                {color === c && <IonIcon icon={checkmark} slot="end" />}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </ResponsiveModal>

      <ModalSelect
        label="Disabled"
        display_value=""
        placeholder="Cannot open"
        disabled
        on_open={() => {}}
      />
    </ComponentSection>
  );
}
