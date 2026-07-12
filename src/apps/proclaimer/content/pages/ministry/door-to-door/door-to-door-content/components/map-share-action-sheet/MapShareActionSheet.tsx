import { IonActionSheet } from "@ionic/react";
import { logoGoogle, logoApple, chatbubbleOutline } from "ionicons/icons";

type MapShareActionSheetProps = {
  lat: number;
  lng: number;
  is_open: boolean;
  on_dismiss: () => void;
};

export function MapShareActionSheet({ lat, lng, is_open, on_dismiss }: MapShareActionSheetProps) {
  const googleUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const appleUrl = `https://maps.apple.com/?ll=${lat},${lng}&q=Location`;

  function openGoogleMaps() {
    window.open(googleUrl, "_blank");
  }

  function openAppleMaps() {
    window.open(appleUrl, "_blank");
  }

  function textGoogleMaps() {
    window.open(`sms:?body=${encodeURIComponent(googleUrl)}`);
  }

  function textAppleMaps() {
    window.open(`sms:?body=${encodeURIComponent(appleUrl)}`);
  }

  return (
    <IonActionSheet
      isOpen={is_open}
      header="Share Location"
      buttons={[
        {
          text: "Open in Google Maps",
          icon: logoGoogle,
          handler: openGoogleMaps,
        },
        {
          text: "Open in Apple Maps",
          icon: logoApple,
          handler: openAppleMaps,
        },
        {
          text: "SMS Google Maps Link",
          icon: chatbubbleOutline,
          handler: textGoogleMaps,
        },
        {
          text: "SMS Apple Maps Link",
          icon: chatbubbleOutline,
          handler: textAppleMaps,
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ]}
      onDidDismiss={on_dismiss}
    />
  );
}
