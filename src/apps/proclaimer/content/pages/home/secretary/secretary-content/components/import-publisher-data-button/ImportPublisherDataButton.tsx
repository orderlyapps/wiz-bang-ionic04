import { useState } from "react";
import { useIonAlert } from "@ionic/react";
import { FileUploadButton } from "@ui/components/inputs/file/FileUploadButton";
import { importPublisherLocalData } from "@shared/database/rxdb/helper/publisherLocalExportImport";

export function ImportPublisherDataButton() {
  const [presentAlert] = useIonAlert();
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    void presentAlert({
      header: "Import Publisher Data",
      message:
        "This will replace all existing confidential publisher data. This action cannot be undone. Continue?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Import",
          role: "confirm",
          handler: () => {
            setLoading(true);
            importPublisherLocalData(file)
              .then(() => {
                void presentAlert({
                  header: "Import Successful",
                  message: "Publisher data has been imported successfully.",
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
              .finally(() => setLoading(false));
          },
        },
      ],
    });
  };

  return (
    <FileUploadButton
      label="Import Publisher Data"
      accept=".json"
      color="medium"
      fill="clear"
      expand="block"
      loading={loading}
      on_file_select={handleFileSelect}
    />
  );
}
