import { useState } from "react";
import { IonItem, IonLabel, IonText, useIonAlert } from "@ionic/react";
import { FileUploadButton } from "@ui/components/inputs/file/FileUploadButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import {
  exportMinistryTimeData,
  importMinistryTimeData,
  generateMinistryTimeExportFilename,
} from "@shared/database/rxdb/helper/ministryTimeExportImport";

export function DataManagement() {
  const [presentAlert] = useIonAlert();
  const [exporting, set_exporting] = useState(false);
  const [importing, set_importing] = useState(false);

  async function handle_export() {
    set_exporting(true);
    try {
      const blob = await exportMinistryTimeData();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = generateMinistryTimeExportFilename();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      void presentAlert({
        header: "Export Failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
        buttons: ["OK"],
      });
    } finally {
      set_exporting(false);
    }
  }

  function handle_file_select(files: FileList) {
    const file = files[0];
    if (!file) return;

    void presentAlert({
      header: "Import Ministry Time Data",
      message:
        "This will replace all existing ministry time entries and settings. This action cannot be undone. Continue?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Import",
          role: "confirm",
          handler: () => {
            set_importing(true);
            importMinistryTimeData(file)
              .then(() => {
                void presentAlert({
                  header: "Import Successful",
                  message: "Ministry time data has been imported successfully.",
                  buttons: ["OK"],
                });
              })
              .catch((err: unknown) => {
                void presentAlert({
                  header: "Import Failed",
                  message: err instanceof Error ? err.message : "An unexpected error occurred.",
                  buttons: ["OK"],
                });
              })
              .finally(() => set_importing(false));
          },
        },
      ],
    });
  }

  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <h3>Backup &amp; Restore</h3>
          <IonText color="medium">
            <p>
              Export your ministry time entries and pioneer hour settings to a file for safekeeping,
              or import from a previous backup.
            </p>
          </IonText>
        </IonLabel>
      </IonItem>
      <Space size="md" />
      <TextButton
        label={exporting ? "Exporting..." : "Export Data"}
        color="primary"
        fill="outline"
        disabled={exporting}
        on_click={handle_export}
      />
      <Space size="md" />
      <FileUploadButton
        label={importing ? "Importing..." : "Import Data"}
        accept=".json"
        color="medium"
        fill="outline"
        loading={importing}
        on_file_select={handle_file_select}
      />
    </>
  );
}
