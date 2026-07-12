import { IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function InputWrapper({ label, children, disabled = false }: InputWrapperProps) {
  return (
    <>
      <IonItem style={{ maxWidth: 480, marginInline: "auto", paddingBlock: 0 }} lines="none">
        <IonLabel>
          <Label style={{ opacity: disabled ? 0.25 : 1 }}>{label}</Label>
        </IonLabel>
      </IonItem>
      <IonItem style={{ maxWidth: 480, marginInline: "auto" }}>
        <div
          slot="end"
          className="ion-text-end ion-display-flex ion-justify-content-end"
          style={{ minWidth: "100%" }}
        >
          {children}
        </div>
      </IonItem>
    </>
  );
}
