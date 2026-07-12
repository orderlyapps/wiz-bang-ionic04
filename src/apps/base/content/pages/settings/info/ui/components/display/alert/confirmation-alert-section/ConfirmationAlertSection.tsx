import { useState } from "react";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import { IonButton, IonItem } from "@ionic/react";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "is_open", value: "boolean — Controls alert visibility." },
  { label: "header", value: "string — The alert heading text." },
  { label: "message", value: "string — The alert body message." },
  { label: "confirm_text", value: "string — Label for the confirm button." },
  {
    label: "confirm_color",
    value:
      '— Ionic color token for the confirm button (e.g. "danger"). Optional. When set, button renders as destructive.',
  },
  { label: "cancel_text", value: "string — Label for the cancel button." },
  { label: "on_confirm", value: "() => void — Called when the user confirms." },
  { label: "on_cancel", value: "() => void — Called when the alert is dismissed or cancelled." },
];

export function ConfirmationAlertSection() {
  const [is_open, set_is_open] = useState(false);
  const [destructive_open, set_destructive_open] = useState(false);

  return (
    <ComponentSection
      title="ConfirmationAlert"
      description="A two-button confirmation dialog built on IonAlert. Presents a header, message, and cancel/confirm actions. Optionally renders the confirm button as destructive."
      props={props}
    >
      <IonItem lines="none">
        <IonButton onClick={() => set_is_open(true)}>Open Confirmation</IonButton>
        <IonButton color="danger" onClick={() => set_destructive_open(true)}>
          Open Destructive
        </IonButton>
      </IonItem>

      <ConfirmationAlert
        is_open={is_open}
        header="Confirm Action"
        message="Are you sure you want to proceed?"
        confirm_text="Confirm"
        cancel_text="Cancel"
        on_confirm={() => set_is_open(false)}
        on_cancel={() => set_is_open(false)}
      />

      <ConfirmationAlert
        is_open={destructive_open}
        header="Delete Item"
        message="This action cannot be undone."
        confirm_text="Delete"
        confirm_color="danger"
        cancel_text="Cancel"
        on_confirm={() => set_destructive_open(false)}
        on_cancel={() => set_destructive_open(false)}
      />
    </ComponentSection>
  );
}
