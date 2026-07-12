import { IonInputOtp } from "@ionic/react";

interface OtpInputProps {
  value: string;
  on_change: (value: string) => void;
  on_complete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({
  value,
  on_change,
  on_complete,
  length = 6,
  disabled = false,
}: OtpInputProps) {
  return (
    <IonInputOtp
      value={value}
      onIonChange={(e) => on_change(e.detail.value || "")}
      onIonComplete={(e) => on_complete?.(e.detail.value || "")}
      length={length}
      disabled={disabled}
    />
  );
}
