import { IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CongregationSelectContent } from "./congregation-select-content/CongregationSelectContent";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

interface CongregationSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect?: () => void;
  title?: string;
}

export function CongregationSelectModal({
  isOpen,
  onDismiss,
  onSelect,
}: CongregationSelectModalProps) {
  const handleSelect = () => {
    onSelect?.();
    onDismiss();
  };

  return (
    <ResponsiveModal isOpen={isOpen}>
      <IonContent className="ion-padding content-wide">
        <Space size="lg" />
        <div className="ion-text-center ion-margin ion-padding">
          <Heading size="2xl" bold balance>
            Welcome to the Proclaimer app
          </Heading>
          <Space />
          <br />
          <Body balance color="medium">
            To get started, select your congregation below.
          </Body>
        </div>
        <CongregationSelectContent onSelect={handleSelect} />
      </IonContent>
    </ResponsiveModal>
  );
}
