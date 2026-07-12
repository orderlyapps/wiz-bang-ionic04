import { IonButton } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";

interface UpdatePasswordSuccessProps {
  on_done: () => void;
}

export function UpdatePasswordSuccess({ on_done }: UpdatePasswordSuccessProps) {
  return (
    <>
      <Body color="medium" className="ion-text-center ion-margin">
        Password saved successfully.
      </Body>
      <Space />
      <IonButton
        expand="block"
        className="ion-margin-horizontal"
        style={{ maxWidth: 360, marginInline: "auto" }}
        onClick={on_done}
      >
        Done
      </IonButton>
    </>
  );
}
