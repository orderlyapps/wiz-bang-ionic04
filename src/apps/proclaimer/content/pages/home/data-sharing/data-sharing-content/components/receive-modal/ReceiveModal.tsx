import { useEffect, useState } from "react";
import { rxdb } from "@shared/database/rxdb/database";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { useReceiveSession } from "./useReceiveSession";

interface Props {
  is_open: boolean;
  onClose: () => void;
}

export function ReceiveModal({ is_open, onClose }: Props) {
  const [code, setCode] = useState("");
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const [import_error, setImportError] = useState<string | null>(null);
  const { status, error_message, received_payload, connect, reset } = useReceiveSession();

  useEffect(() => {
    if (!is_open) return;
    setImported(false);
    setImportError(null);
  }, [is_open, received_payload]);

  async function handleImport() {
    if (received_payload?.type !== "publisher-local") return;
    setImporting(true);
    setImportError(null);
    try {
      await rxdb.publisher.find().remove();
      await rxdb.publisher.bulkInsert(received_payload.data);
      setImported(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Import failed";
      setImportError(message);
    } finally {
      setImporting(false);
    }
  }

  function handleClose() {
    reset();
    setCode("");
    setImported(false);
    setImportError(null);
    onClose();
  }

  function handleConnect() {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6) return;
    setImported(false);
    setImportError(null);
    connect(trimmed);
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleClose} fullscreen={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Receive Data</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === "idle" && (
          <>
            <IonItem>
              <IonInput
                label="Connection code"
                labelPlacement="stacked"
                placeholder="Enter 6-character code"
                value={code}
                onIonInput={(e) => setCode((e.detail.value ?? "").toUpperCase())}
                maxlength={6}
                autocomplete="off"
                style={{ letterSpacing: "0.2rem", fontWeight: "bold" }}
              />
            </IonItem>
            <Space />
            <IonButton expand="block" onClick={handleConnect} disabled={code.trim().length !== 6}>
              Connect
            </IonButton>
          </>
        )}

        {status === "connecting" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            <IonSpinner name="crescent" style={{ width: 48, height: 48 }} />
            <IonNote>Connecting…</IonNote>
          </div>
        )}

        {status === "connected" && (
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <p
              style={{ color: "var(--ion-color-success)", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Connected successfully!
            </p>
            {received_payload === null && (
              <>
                <Space />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <IonSpinner name="dots" />
                  <IonNote>Waiting for data…</IonNote>
                </div>
              </>
            )}
            {received_payload?.type === "publisher-local" && (
              <>
                <Space />
                <IonNote style={{ color: "var(--ion-color-success)", display: "block" }}>
                  Data received
                </IonNote>
                <Space size="sm" />
                <p style={{ margin: 0 }}>
                  <strong>{received_payload.data.length}</strong> publisher record
                  {received_payload.data.length !== 1 ? "s" : ""} received.
                </p>
                <Space />
                {import_error && (
                  <IonNote style={{ color: "var(--ion-color-danger)", display: "block" }}>
                    Import failed: {import_error}
                  </IonNote>
                )}
                {!imported ? (
                  <IonButton
                    expand="block"
                    onClick={() => {
                      void handleImport();
                    }}
                    disabled={importing}
                  >
                    {importing ? (
                      <>
                        <IonSpinner name="crescent" style={{ marginRight: 8 }} />
                        Importing…
                      </>
                    ) : (
                      "Import Publisher Data"
                    )}
                  </IonButton>
                ) : (
                  <IonNote style={{ color: "var(--ion-color-success)" }}>Import complete.</IonNote>
                )}
              </>
            )}
            {received_payload?.type === "heartbeat" && (
              <>
                <Space />
                <IonNote style={{ color: "var(--ion-color-medium)" }}>
                  Connected — waiting for publisher data…
                </IonNote>
              </>
            )}
          </div>
        )}

        {status === "disconnected" && (
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <p style={{ color: "var(--ion-color-warning)" }}>
              Connection lost. Close and try again.
            </p>
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <p style={{ color: "var(--ion-color-danger)" }}>Error: {error_message}</p>
            <Space />
            <IonButton fill="outline" onClick={reset}>
              Try again
            </IonButton>
          </div>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
