import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { OtpCountdown } from "../otp-countdown/OtpCountdown";

interface OtpDisplayModalProps {
  isOpen: boolean;
  otp: string | null;
  smsPhone?: string | null;
  onDismiss: () => void;
}

export function OtpDisplayModal({ isOpen, otp, smsPhone, onDismiss }: OtpDisplayModalProps) {
  const handleSendSms = () => {
    if (!otp) return;
    const expiry = new Date(Date.now() + 60 * 60 * 1000);
    const expiryTime = expiry.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const body = encodeURIComponent(
      `Your sign-in code is: ${otp}\nThis code will expire at ${expiryTime}.`,
    );
    window.location.href = `sms:${smsPhone ?? ""}?&body=${body}`;
  };

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>One-Time Code</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton skip_confirmation on_click={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <Space size="lg" />
        <Heading>{otp ?? "—"}</Heading>
        <Space />
        {isOpen && otp && <OtpCountdown key={otp} durationSeconds={60} onExpire={onDismiss} />}
        <Space size="lg" />
        {otp && <TextButton on_click={handleSendSms} label="Send via SMS" />}
        <TextButton fill="clear" on_click={onDismiss} label="Close" />
      </IonContent>
    </ResponsiveModal>
  );
}
