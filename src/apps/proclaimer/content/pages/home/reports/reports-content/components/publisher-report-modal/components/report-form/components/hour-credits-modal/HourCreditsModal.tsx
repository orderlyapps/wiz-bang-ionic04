import { useEffect, useState } from "react";
import { IonButtons, IonContent, IonHeader, IonList, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Select } from "@ui/components/inputs/select/Select";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { NumberInput } from "@ui/components/inputs/number/NumberInput";

export type CreditHours = Partial<Record<"ldc" | "bethel" | "hlc", number>>;

interface HourCreditsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  on_save: (credits: CreditHours) => void;
  initial_values: CreditHours;
}

const CREDIT_OPTIONS = [
  { label: "LDC", value: "ldc" },
  { label: "Bethel", value: "bethel" },
  { label: "HLC", value: "hlc" },
];

export function HourCreditsModal({
  is_open,
  on_dismiss,
  on_save,
  initial_values,
}: HourCreditsModalProps) {
  const [credits, set_credits] = useState<CreditHours>(initial_values);
  const [selected_type, set_selected_type] = useState<string>("ldc");

  useEffect(() => {
    if (is_open) set_credits(initial_values);
  }, [is_open, initial_values]);

  const current_hours = credits[selected_type] ?? null;
  const hours_string = current_hours != null ? String(current_hours) : "";

  const handle_save = () => {
    on_save(credits);
    on_dismiss();
  };

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hour Credits</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <Select
            label="Credit Type"
            value={selected_type}
            options={CREDIT_OPTIONS}
            on_change={(value) => set_selected_type(value as string)}
            interface_type="popover"
          />

          <NumberInput
            label="Hours"
            value={hours_string}
            on_change={(val) => {
              set_credits((prev) => {
                const next = { ...prev };
                if (val !== "") {
                  next[selected_type] = Number(val);
                } else {
                  delete next[selected_type];
                }
                return next;
              });
            }}
          />

          <Space />

          <TextButton on_click={handle_save} label="Done" />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
