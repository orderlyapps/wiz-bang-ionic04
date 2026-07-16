import { useState } from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

interface AlertPhoneInputProps {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function AlertPhoneInput({
  label,
  value,
  placeholder,
  disabled = false,
  on_change,
}: AlertPhoneInputProps) {
  const [is_open, set_is_open] = useState(false);
  const [draft, set_draft] = useState(value);

  function handle_open() {
    set_draft(value);
    set_is_open(true);
  }

  function handle_save() {
    on_change(draft.trim());
    set_is_open(false);
  }

  return (
    <>
      <ModalMultiSelectTrigger
        label={label}
        display_value={value || null}
        placeholder={placeholder}
        disabled={disabled}
        on_click={() => !disabled && handle_open()}
      />
      <ResponsiveModal isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => set_is_open(false)}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={handle_save}>
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <PhoneInput
            label={label}
            value={draft}
            placeholder={placeholder ?? "Enter phone number..."}
            on_change={set_draft}
          />
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
