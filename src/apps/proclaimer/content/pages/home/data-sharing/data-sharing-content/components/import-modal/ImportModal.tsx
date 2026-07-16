import { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { rxdb } from "@shared/database/rxdb/database";
import type { PublisherLocal } from "@shared/database/rxdb/collections/publisher";

interface Props {
  is_open: boolean;
  onClose: () => void;
}

interface ImportPayload {
  type: "publisher-local";
  data: PublisherLocal[];
}

export function ImportModal({ is_open, onClose }: Props) {
  const [presentAlert] = useIonAlert();
  const file_input_ref = useRef<HTMLInputElement>(null);
  const [file_name, set_file_name] = useState<string | null>(null);
  const [parsed_data, set_parsed_data] = useState<ImportPayload | null>(null);
  const [importing, set_importing] = useState(false);
  const [imported, set_imported] = useState(false);
  const [error, set_error] = useState<string | null>(null);

  useEffect(() => {
    if (!is_open) return;
    set_file_name(null);
    set_parsed_data(null);
    set_importing(false);
    set_imported(false);
    set_error(null);
  }, [is_open]);

  function handle_file_change(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    set_file_name(file.name);
    set_error(null);
    set_imported(false);
    set_parsed_data(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const parsed = JSON.parse(text);
        let records: PublisherLocal[];
        if (Array.isArray(parsed)) {
          records = parsed as PublisherLocal[];
        } else if (parsed && parsed.type === "publisher-local" && Array.isArray(parsed.data)) {
          records = parsed.data as PublisherLocal[];
        } else {
          set_error("Invalid file format: expected publisher-local data");
          return;
        }
        set_parsed_data({ type: "publisher-local", data: records });
      } catch {
        set_error("Could not parse file. Make sure it is a valid export file.");
      }
    };
    reader.onerror = () => set_error("Failed to read file");
    reader.readAsText(file);
  }

  function handle_import() {
    if (!parsed_data) return;
    void presentAlert({
      header: "Import Data",
      message:
        "This will replace all existing publisher data. This action cannot be undone. Continue?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Import",
          role: "confirm",
          handler: () => void do_import(),
        },
      ],
    });
  }

  async function do_import() {
    if (!parsed_data) return;
    set_importing(true);
    set_error(null);
    try {
      await rxdb.publisher.find().remove();
      await rxdb.publisher.bulkInsert(parsed_data.data);
      set_imported(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Import failed";
      set_error(message);
    } finally {
      set_importing(false);
    }
  }

  function handle_close() {
    if (file_input_ref.current) file_input_ref.current.value = "";
    set_file_name(null);
    set_parsed_data(null);
    set_importing(false);
    set_imported(false);
    set_error(null);
    onClose();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handle_close} fullscreen={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Import Data</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <input
          ref={file_input_ref}
          type="file"
          accept=".ord,.json"
          onChange={handle_file_change}
          style={{ display: "none" }}
        />
        <IonItem button onClick={() => file_input_ref.current?.click()}>
          <IonLabel>
            {file_name ? (
              <>{file_name}</>
            ) : (
              <IonNote color="medium">Select a file to import…</IonNote>
            )}
          </IonLabel>
        </IonItem>
        <Space />
        {error && (
          <IonNote style={{ color: "var(--ion-color-danger)", display: "block" }}>{error}</IonNote>
        )}
        {parsed_data && !imported && (
          <IonNote style={{ display: "block", marginBottom: "0.5rem" }}>
            {parsed_data.data.length} publisher record
            {parsed_data.data.length !== 1 ? "s" : ""} ready to import.
          </IonNote>
        )}
        {imported && (
          <IonNote style={{ color: "var(--ion-color-success)", display: "block" }}>
            Import complete. Existing data was replaced.
          </IonNote>
        )}
        <Space size="sm" />
        <IonButton
          expand="block"
          onClick={handle_import}
          disabled={importing || !parsed_data || imported}
        >
          {importing ? (
            <>
              <IonSpinner name="crescent" style={{ marginRight: 8 }} />
              Importing…
            </>
          ) : (
            "Import from file"
          )}
        </IonButton>
      </IonContent>
    </ResponsiveModal>
  );
}
