import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BranchReportHeader } from "@proclaimer-content/pages/home/secretary/branch-report/branch-report-header/BranchReportHeader";
import { BranchReportContent } from "@proclaimer-content/pages/home/secretary/branch-report/branch-report-content/BranchReportContent";

function BranchReportPage() {
  return (
    <IonPage>
      <IonHeader>
        <BranchReportHeader />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <BranchReportContent />
      </IonContent>
    </IonPage>
  );
}

export default BranchReportPage;
