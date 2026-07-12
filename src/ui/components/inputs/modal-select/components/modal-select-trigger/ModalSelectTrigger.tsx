import { IonIcon, isPlatform } from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";

interface ModalSelectTriggerProps {
  label: string;
  display_value: string;
  placeholder?: string;
  disabled?: boolean;
  on_click: () => void;
}

export function ModalSelectTrigger({
  label,
  display_value,
  placeholder,
  disabled = false,
  on_click,
}: ModalSelectTriggerProps) {
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
          opacity: disabled ? 0.4 : 1,
        }}
      >
        <Body color={!display_value || disabled ? "medium" : undefined}>
          {display_value || placeholder || "Select..."}
        </Body>

        <IonIcon
          ios={chevronExpand}
          md={caretDownSharp}
          color="medium"
          style={{ fontSize: isPlatform("ios") ? "1em" : "0.8em" }}
        />
      </div>
    </InputWrapper>
  );
}
