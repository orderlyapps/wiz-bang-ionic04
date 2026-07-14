import { useState } from "react";
import { IonFab, IonFabButton, IonIcon, IonAlert, type AlertButton } from "@ionic/react";
import { informationOutline } from "ionicons/icons";

const LINKS = [
  {
    label: "km 4/07",
    url: "https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&docid=202007130",
  },
  {
    label: "km 5/95",
    url: "https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&docid=201995168",
  },
];

export function QuickLinksFab() {
  const [showAlert, setShowAlert] = useState(false);

  function openLink(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    setShowAlert(false);
  }

  const buttons: AlertButton[] = [
    ...LINKS.map((link) => ({
      text: link.label,
      handler: () => openLink(link.url),
    })),
    { text: "Cancel", role: "cancel" },
  ];

  const currentDate = new Date();
  const endOfNextYear = new Date(currentDate.getFullYear() + 2, 0, 0);

  if (currentDate < endOfNextYear) {
    return null;
  }

  return (
    <>
      <IonFab vertical="top" horizontal="start" slot="fixed">
        <IonFabButton onClick={() => setShowAlert(true)} color="warning">
          <IonIcon icon={informationOutline} />
        </IonFabButton>
      </IonFab>
      <IonAlert
        isOpen={showAlert}
        header="Instructions"
        message="Choose a publication"
        buttons={buttons}
        onDidDismiss={() => setShowAlert(false)}
      />
    </>
  );
}
