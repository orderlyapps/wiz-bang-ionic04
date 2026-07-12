import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { OtpSignIn } from "./components/otp-sign-in/OtpSignIn";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

interface OtpSignInModalProps {
  publisher_id: string;
  onSignIn: () => void;
}

export function OtpSignInModal({ publisher_id, onSignIn }: OtpSignInModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TextButton on_click={() => setIsOpen(true)} label="Sign In with Code" />
      <ResponsiveModal isOpen={isOpen} onIonModalDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign In with Code</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton skip_confirmation on_click={() => setIsOpen(false)} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <OtpSignIn
            email={`${publisher_id}@proclaimer.app`}
            onSignIn={() => {
              setIsOpen(false);
              onSignIn();
            }}
          />
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
