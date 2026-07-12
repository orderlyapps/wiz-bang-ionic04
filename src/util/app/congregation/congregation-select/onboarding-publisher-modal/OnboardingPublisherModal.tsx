import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { PublisherSelectContent } from "@proclaimer-content/pages/settings/profile/profile-content/components/publisher-select/publisher-select-modal/publisher-select-content/PublisherSelectContent";
import { PublisherSignIn } from "@proclaimer-content/pages/settings/profile/profile-content/components/publisher-sign-in/PublisherSignIn";
import {
  getStoredPublisher,
  setStoredPublisher,
  getPublisherDisplayName,
} from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface OnboardingPublisherModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function OnboardingPublisherModal({ isOpen, onDismiss }: OnboardingPublisherModalProps) {
  const [publisher, setPublisher] = useState<Publisher | null>(getStoredPublisher());

  const handlePublisherSelected = (p: Publisher) => {
    setStoredPublisher(p);
    setPublisher(p);
  };

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{publisher ? "Sign In" : "Select Publisher"}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>{publisher ? "Done" : "Skip"}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <Space size="lg" />
        <div className="ion-text-center ion-margin">
          <Heading size="2xl" bold balance>
            {publisher
              ? `Welcome, ${getPublisherDisplayName(publisher)}!`
              : "Select Your Publisher"}
          </Heading>
          <Space />
          <Body balance color="medium">
            {publisher
              ? "You can sign in now or skip and do it later from Settings."
              : "Find your name below to personalise your experience. You can skip this and do it later from Settings."}
          </Body>
        </div>
        {!publisher ? (
          <PublisherSelectContent onPublisherSelected={handlePublisherSelected} />
        ) : (
          <IonList inset lines="none">
            <LabelValueItem label="Publisher" value={getPublisherDisplayName(publisher)} />
            <Space />
            <PublisherSignIn publisher={publisher} />
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
