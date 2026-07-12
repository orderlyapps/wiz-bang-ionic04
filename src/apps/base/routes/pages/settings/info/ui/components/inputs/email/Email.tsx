import { EmailContent } from "@base-content/pages/settings/info/ui/components/inputs/email/email-content/EmailContent";
import { EmailHeader } from "@base-content/pages/settings/info/ui/components/inputs/email/email-header/EmailHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function EmailPage() {
  return (
    <IonPage>
      <IonHeader>
        <EmailHeader />
      </IonHeader>
      <IonContent>
        <EmailContent />
      </IonContent>
    </IonPage>
  );
}

export default EmailPage;
