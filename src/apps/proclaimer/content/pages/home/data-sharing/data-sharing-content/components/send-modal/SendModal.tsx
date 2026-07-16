import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { useSendSession } from "./useSendSession";

interface Props {
  is_open: boolean;
  onClose: () => void;
}

export function SendModal({ is_open, onClose }: Props) {
  const { code, seconds_remaining, status, error_message, sendPublisherData } =
    useSendSession(is_open);
  const [sending, setSending] = useState(false);
  const [sent_count, setSentCount] = useState<number | null>(null);

  useEffect(() => {
    if (!is_open) return;
    setSending(false);
    setSentCount(null);
  }, [is_open]);

  const minutes = Math.floor(seconds_remaining / 60);
  const seconds = seconds_remaining % 60;
  const countdown = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={onClose} fullscreen={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Send Data</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === "waiting" && (
          <>
            <p>Share this code with the receiver:</p>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                letterSpacing: "0.4rem",
                textAlign: "center",
                margin: "1rem 0",
              }}
            >
              {code}
            </div>
            <p style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
              Expires in {countdown}
            </p>
          </>
        )}
        {status === "connected" && (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "var(--ion-color-success)",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              Connected successfully!
            </p>
            <Space />
            {sent_count === null && (
              <IonButton
                expand="block"
                onClick={() => {
                  setSending(true);
                  void sendPublisherData()
                    .then((count) => {
                      setSentCount(count);
                      setSending(false);
                    })
                    .catch(() => {
                      setSending(false);
                    });
                }}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <IonSpinner name="crescent" style={{ marginRight: 8 }} />
                    Sending…
                  </>
                ) : (
                  "Send Publisher Data"
                )}
              </IonButton>
            )}
            {sent_count !== null && (
              <IonNote style={{ color: "var(--ion-color-success)" }}>
                {sent_count} publisher record{sent_count !== 1 ? "s" : ""} sent.
              </IonNote>
            )}
          </div>
        )}
        {status === "disconnected" && (
          <p style={{ textAlign: "center", color: "var(--ion-color-warning)" }}>
            Connection lost. Close and try again.
          </p>
        )}
        {status === "expired" && (
          <p style={{ textAlign: "center", color: "var(--ion-color-danger)" }}>
            Code expired. Close and try again.
          </p>
        )}
        {status === "error" && (
          <p style={{ textAlign: "center", color: "var(--ion-color-danger)" }}>
            Error: {error_message}
          </p>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
