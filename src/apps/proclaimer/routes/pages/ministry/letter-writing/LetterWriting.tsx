import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LetterWritingHeader } from "@proclaimer-content/pages/ministry/letter-writing/letter-writing-header/LetterWritingHeader";
import { LetterWritingContent } from "@proclaimer-content/pages/ministry/letter-writing/letter-writing-content/LetterWritingContent";

function LetterWritingPage() {
  return (
    <IonPage>
      <IonHeader>
        <LetterWritingHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <LetterWritingContent />
      </IonContent>
    </IonPage>
  );
}

export default LetterWritingPage;
