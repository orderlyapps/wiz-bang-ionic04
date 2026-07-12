import { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonActionSheet,
  IonContent,
} from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Publisher } from "@shared/database/schemas/publisher";
import { PasswordStep } from "../password-step/PasswordStep";
import { OtpSignIn } from "../otp-step/OtpSignIn";

type SignInMethod = "password" | "otp";

interface PublisherSelectStepProps {
  publishers: Publisher[];
  isLoading: boolean;
  onSignIn: () => void;
}

export function PublisherSelectStep({ publishers, isLoading, onSignIn }: PublisherSelectStepProps) {
  const [pending_publisher, setPendingPublisher] = useState<Publisher | null>(null);
  const [selected_publisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [sign_in_method, setSignInMethod] = useState<SignInMethod | null>(null);

  const handleMethodSelect = (publisher: Publisher, method: SignInMethod) => {
    setSelectedPublisher(publisher);
    setSignInMethod(method);
    setPendingPublisher(null);
  };

  const handleClose = () => {
    setSelectedPublisher(null);
    setSignInMethod(null);
  };

  if (isLoading) {
    return (
      <IonList inset>
        {[1, 2, 3].map((i) => (
          <IonItem key={i}>
            <IonLabel>
              <IonSkeletonText style={{ width: "50%" }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }

  if (publishers.length === 0) {
    return (
      <IonList inset>
        <IonItem>
          <IonLabel>No admin users available.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <>
      <IonList className="ion-margin" inset>
        <MultiColumnList<Publisher>
          items={publishers}
          get_id={(p) => p.id ?? ""}
          gap="sm"
          render_item={(p) => (
            <IonItem button onClick={() => setPendingPublisher(p)}>
              <IonLabel className="ion-margin-start ion-padding-start">
                {p.display_name ?? `${p.first_name} ${p.last_name}`}
              </IonLabel>
            </IonItem>
          )}
        />
      </IonList>

      <IonActionSheet
        isOpen={!!pending_publisher}
        header={`Sign in as ${pending_publisher?.display_name ?? `${pending_publisher?.first_name} ${pending_publisher?.last_name}`}`}
        onDidDismiss={() => setPendingPublisher(null)}
        buttons={[
          {
            text: "Password",
            handler: () => {
              if (pending_publisher) handleMethodSelect(pending_publisher, "password");
            },
          },
          {
            text: "One-time password (OTP)",
            handler: () => {
              if (pending_publisher) handleMethodSelect(pending_publisher, "otp");
            },
          },
          { text: "Cancel", role: "cancel" },
        ]}
      />

      <ResponsiveModal isOpen={selected_publisher !== null && sign_in_method === "password"}>
        <IonContent className="ion-padding">
          {selected_publisher && (
            <PasswordStep publisher={selected_publisher} onBack={handleClose} onSignIn={onSignIn} />
          )}
        </IonContent>
      </ResponsiveModal>

      <ResponsiveModal isOpen={selected_publisher !== null && sign_in_method === "otp"}>
        <IonContent className="ion-padding">
          {selected_publisher && (
            <OtpSignIn
              email={`${selected_publisher.id}@proclaimer.app`}
              onSignIn={onSignIn}
              onCancel={handleClose}
            />
          )}
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
