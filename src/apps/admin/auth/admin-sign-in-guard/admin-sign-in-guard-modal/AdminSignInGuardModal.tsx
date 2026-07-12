import { IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { AdminSignInContent } from "./admin-sign-in-content/AdminSignInContent";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

interface AdminSignInGuardModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function AdminSignInGuardModal({ isOpen, onDismiss }: AdminSignInGuardModalProps) {
  return (
    <ResponsiveModal isOpen={isOpen} backdropDismiss={false} keyboardClose={false}>
      <IonContent className="ion-padding content-wide">
        <Space size="lg" />
        <div className="ion-text-center ion-margin ion-padding">
          <Heading size="2xl" bold balance>
            Admin Sign In
          </Heading>
          <Space />
          <Body balance color="medium">
            Select your name and enter your password to continue.
          </Body>
        </div>
        <AdminSignInContent onSignIn={onDismiss} />
      </IonContent>
    </ResponsiveModal>
  );
}
