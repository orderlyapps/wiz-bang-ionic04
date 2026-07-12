import { useState } from "react";
import { IonActionSheet, IonAlert } from "@ionic/react";
import { addOutline, reorderFourOutline } from "ionicons/icons";

type Step = "idle" | "type" | "name";

type Props = {
  is_open: boolean;
  on_dismiss: () => void;
  on_add: (type: "block" | "face", name: string) => void;
};

export function AddBlockFlow({ is_open, on_dismiss, on_add }: Props) {
  const [step, set_step] = useState<Step>("type");
  const [selected_type, set_selected_type] = useState<"block" | "face" | null>(null);
  const [name_alert_key, set_name_alert_key] = useState(0);

  function handleTypeSelect(type: "block" | "face") {
    set_selected_type(type);
    set_name_alert_key((k) => k + 1);
    set_step("name");
  }

  function handleNameConfirm(name: string) {
    if (!selected_type || !name.trim()) return;
    on_add(selected_type, name.trim());
    reset();
  }

  function reset() {
    set_step("type");
    set_selected_type(null);
    on_dismiss();
  }

  return (
    <>
      <IonActionSheet
        isOpen={is_open && step === "type"}
        header="Add Feature"
        buttons={[
          {
            text: "Block",
            icon: reorderFourOutline,
            handler: () => handleTypeSelect("block"),
          },
          {
            text: "Face",
            icon: addOutline,
            handler: () => handleTypeSelect("face"),
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: reset,
          },
        ]}
        onDidDismiss={(e) => {
          if (e.detail.role === "cancel" || e.detail.role === "backdrop") reset();
        }}
      />
      <IonAlert
        key={name_alert_key}
        isOpen={step === "name"}
        header={`Name this ${selected_type ?? "feature"}`}
        inputs={[
          {
            name: "name",
            type: "text",
            placeholder: selected_type === "block" ? "e.g. Block 1" : "e.g. North Face",
            attributes: { autoFocus: true },
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel", handler: reset },
          {
            text: "Next",
            handler: (data: { name?: string }) => {
              if (!data.name?.trim()) return false;
              handleNameConfirm(data.name);
            },
          },
        ]}
        onDidDismiss={(e) => {
          if (e.detail.role === "cancel" || e.detail.role === "backdrop") reset();
        }}
      />
    </>
  );
}
