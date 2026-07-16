import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { rxdb } from "@shared/database/rxdb/database";
import type { PublisherLocal } from "@shared/database/rxdb/collections/publisher";
import {
  generateExportFilename,
  type OptionalPublisherExportField,
} from "@shared/database/rxdb/helper/publisherLocalExportImport";

interface Props {
  is_open: boolean;
  onClose: () => void;
}

const EXPORT_FIELDS: { key: OptionalPublisherExportField; label: string }[] = [
  { key: "phone", label: "Phone numbers" },
  { key: "address", label: "Addresses" },
  { key: "email", label: "Email addresses" },
  { key: "emergency_contact", label: "Emergency contacts" },
  { key: "photo", label: "Photos" },
  { key: "birth_date", label: "Birth dates" },
  { key: "baptism_date", label: "Baptism dates" },
];

export function ExportModal({ is_open, onClose }: Props) {
  const [selected, set_selected] = useState<Set<OptionalPublisherExportField>>(
    new Set(EXPORT_FIELDS.map((f) => f.key)),
  );
  const [exporting, set_exporting] = useState(false);
  const [exported_count, set_exported_count] = useState<number | null>(null);
  const [error, set_error] = useState<string | null>(null);

  useEffect(() => {
    if (!is_open) return;
    set_selected(new Set(EXPORT_FIELDS.map((f) => f.key)));
    set_exporting(false);
    set_exported_count(null);
    set_error(null);
  }, [is_open]);

  function toggle_field(key: OptionalPublisherExportField) {
    set_selected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function handle_export() {
    set_exporting(true);
    set_error(null);
    set_exported_count(null);
    try {
      const docs = await rxdb.publisher.find().exec();
      const data = docs.map((doc) => {
        const full = doc.toJSON() as PublisherLocal;
        const filtered: Record<string, unknown> = {
          publisher_id: full.publisher_id,
          confidential_id: full.confidential_id,
          version: full.version,
        };
        for (const field of EXPORT_FIELDS) {
          if (selected.has(field.key)) {
            const value = full[field.key];
            if (value !== undefined) {
              filtered[field.key] = value;
            }
          }
        }
        return filtered;
      });

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = generateExportFilename();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      set_exported_count(data.length);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Export failed";
      set_error(message);
    } finally {
      set_exporting(false);
    }
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={onClose} fullscreen={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Export Data</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Select which details to include in the export:</p>
        <IonList>
          {EXPORT_FIELDS.map((field) => (
            <IonItem key={field.key}>
              <IonCheckbox
                checked={selected.has(field.key)}
                onIonChange={() => toggle_field(field.key)}
              >
                <IonLabel>{field.label}</IonLabel>
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
        <Space />
        {error && (
          <IonNote style={{ color: "var(--ion-color-danger)", display: "block" }}>{error}</IonNote>
        )}
        {exported_count !== null && (
          <IonNote style={{ color: "var(--ion-color-success)", display: "block" }}>
            Exported {exported_count} publisher record{exported_count !== 1 ? "s" : ""}.
          </IonNote>
        )}
        <Space size="sm" />
        <IonButton
          expand="block"
          onClick={() => void handle_export()}
          disabled={exporting || selected.size === 0}
        >
          {exporting ? (
            <>
              <IonSpinner name="crescent" style={{ marginRight: 8 }} />
              Exporting…
            </>
          ) : (
            "Export to file"
          )}
        </IonButton>
      </IonContent>
    </ResponsiveModal>
  );
}
