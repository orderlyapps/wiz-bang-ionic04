import { OtpContent } from "@base-content/pages/settings/info/ui/components/inputs/otp/otp-content/OtpContent";
import { OtpHeader } from "@base-content/pages/settings/info/ui/components/inputs/otp/otp-header/OtpHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function OtpPage() {
  return (
    <IonPage>
      <IonHeader>
        <OtpHeader />
      </IonHeader>
      <IonContent>
        <OtpContent />
      </IonContent>
    </IonPage>
  );
}

export default OtpPage;
