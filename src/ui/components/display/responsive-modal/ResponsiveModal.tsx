import { IonModal } from "@ionic/react";
import type { ComponentProps } from "react";
import "./ResponsiveModal.css";

type IonModalProps = ComponentProps<typeof IonModal>;

type ResponsiveModalProps = IonModalProps & {
  fullscreen?: boolean;
};

export function ResponsiveModal({ fullscreen = true, className, ...props }: ResponsiveModalProps) {
  const fullscreenClass = fullscreen ? "responsive-modal-fullscreen" : "";
  const combinedClass = [fullscreenClass, className].filter(Boolean).join(" ");

  return (
    <IonModal className={combinedClass} {...props}>
      {props.children}
    </IonModal>
  );
}
