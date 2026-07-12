import { useState } from "react";
import { IonItem, IonLabel, IonList, IonAlert } from "@ionic/react";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import type { ParsedRow } from "../csv-upload/CsvUpload";

interface ImportPreviewProps {
  rows: ParsedRow[];
  on_complete: () => void;
}

export function ImportPreview({ rows, on_complete }: ImportPreviewProps) {
  const [importing, set_importing] = useState(false);
  const [show_success, set_show_success] = useState(false);
  const [error, set_error] = useState<string | null>(null);

  async function handleImport() {
    set_importing(true);
    set_error(null);
    try {
      for (const row of rows) {
        mapLogCollection.insert({
          id: crypto.randomUUID(),
          map_id: row.map_id!,
          publisher_id: row.publisher_id!,
          checked_out_at: row.checked_out_at || null,
          checked_in_at: row.checked_in_at || null,
          notes: row.notes.trim() || null,
        });
      }
      set_show_success(true);
    } catch (err) {
      set_error(err instanceof Error ? err.message : "Import failed");
    } finally {
      set_importing(false);
    }
  }

  return (
    <>
      <Body>{rows.length} rows ready to import.</Body>
      <Space size="sm" />
      <IonList inset>
        {rows.map((row, i) => (
          <IonItem key={i}>
            <IonLabel>
              <Body>
                {row.map_name} — {row.publisher_name}
              </Body>
              <br />
              <Body>Out: {row.checked_out_at || "—"}</Body>
              {row.checked_in_at && (
                <>
                  <br />
                  <Body>In: {row.checked_in_at}</Body>
                </>
              )}
              {row.notes && (
                <>
                  <br />
                  <Body>{row.notes}</Body>
                </>
              )}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      <Space />
      <TextButton
        label={`Import ${rows.length} Rows`}
        disabled={importing || rows.length === 0}
        on_click={handleImport}
      />
      {error && (
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => set_error(null)}
          header="Import Failed"
          message={error}
          buttons={["OK"]}
        />
      )}
      <IonAlert
        isOpen={show_success}
        onDidDismiss={() => {
          set_show_success(false);
          on_complete();
        }}
        header="Success"
        message={`Imported ${rows.length} map log entries.`}
        buttons={["OK"]}
      />
    </>
  );
}
