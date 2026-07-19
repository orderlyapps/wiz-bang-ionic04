import { Body } from "@ui/components/display/text/body/Body";
import { QRCodeSVG } from "qrcode.react";

const APP_URL = "https://proclaimer.app";

export function AppQrCode() {
  return (
    <>
      <div>
        <div className="flex-center">
          <QRCodeSVG value={APP_URL} size={200} />
        </div>
        <div className="flex-center ion-padding">
          <Body>proclaimer.app</Body>
        </div>
      </div>
    </>
  );
}
