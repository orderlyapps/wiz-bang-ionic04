import type { ReactNode } from "react";
import { IonIcon, isPlatform } from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";

interface ModalMultiSelectTriggerProps {
  label: string;
  display_value: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  on_click: () => void;
}

export function ModalMultiSelectTrigger({
  label,
  display_value,
  placeholder,
  disabled = false,
  on_click,
}: ModalMultiSelectTriggerProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <div
        onClick={on_click}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {display_value ?? (
          <Body color="medium" size="sm">
            {placeholder ?? "Select..."}
          </Body>
        )}
        <IonIcon
          ios={chevronExpand}
          md={caretDownSharp}
          color="medium"
          style={{ fontSize: isPlatform("ios") ? "1.1rem" : "0.8rem", flexShrink: 0 }}
        />
      </div>
    </InputWrapper>
  );
}
