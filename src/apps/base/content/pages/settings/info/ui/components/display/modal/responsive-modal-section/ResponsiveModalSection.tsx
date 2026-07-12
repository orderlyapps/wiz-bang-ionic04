import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { Body } from "@ui/components/display/text/body/Body";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";
import { Space } from "@ui/components/layout/space/Space";

const props = [
  {
    label: "fullscreen",
    value:
      "— If true, the modal stays fullscreen at all screen sizes. Defaults to true. Set to false to use Ionic's default responsive behavior.",
  },
  {
    label: "...props",
    value: "— All other IonModal props are supported (isOpen, onDidDismiss, breakpoints, etc.)",
  },
];

export function ResponsiveModalSection() {
  const [open, set_open] = useState(false);
  const [card_open, set_card_open] = useState(false);

  return (
    <ComponentSection
      title="ResponsiveModal"
      description="A thin wrapper around IonModal that defaults to fullscreen at all screen sizes. Set fullscreen={false} to let Ionic handle the responsive behavior (sheet on mobile, card on tablet/desktop at 768px)."
      props={props}
    >
      <IonButton expand="block" onClick={() => set_open(true)}>
        Open Fullscreen Modal (default)
      </IonButton>
      <Space size="sm" />
      <IonButton expand="block" onClick={() => set_card_open(true)}>
        Open Responsive Card Modal
      </IonButton>

      <ResponsiveModal isOpen={open} onDidDismiss={() => set_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Fullscreen Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Body>
            This modal stays fullscreen at all screen sizes. This is the default behavior.
          </Body>
          <IonButton expand="block" onClick={() => set_open(false)} style={{ marginTop: "1rem" }}>
            Close
          </IonButton>
        </IonContent>
      </ResponsiveModal>

      <ResponsiveModal
        isOpen={card_open}
        onDidDismiss={() => set_card_open(false)}
        fullscreen={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Responsive Card Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Body>
            With fullscreen set to false, Ionic's default behavior applies: a sheet on mobile and a
            centered card on tablet/desktop (starting at 768px).
          </Body>
          <IonButton
            expand="block"
            onClick={() => set_card_open(false)}
            style={{ marginTop: "1rem" }}
          >
            Close
          </IonButton>
        </IonContent>
      </ResponsiveModal>
    </ComponentSection>
  );
}
