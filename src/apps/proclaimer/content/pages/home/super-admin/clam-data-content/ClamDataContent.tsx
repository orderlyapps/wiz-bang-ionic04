import { IonAlert, IonButton, IonSpinner } from "@ionic/react";
import { EpubUpload } from "./components/epub-upload/EpubUpload";
import { DataPreview } from "./components/data-preview/DataPreview";
import { ClamDataService, type ParsedMeetingData } from "./services/clam-data-service";
import { useState } from "react";

export function ClamDataContent() {
  const [selected_file, setSelectedFile] = useState<File | null>(null);
  const [parsed_data, setParsedData] = useState<ParsedMeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file_error, setFileError] = useState<string | null>(null);
  const [show_success_alert, setShowSuccessAlert] = useState(false);
  const [imported_count, setImportedCount] = useState(0);

  const handle_file_select = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setLoading(true);

    try {
      const data = await ClamDataService.parseEpubFile(file);
      setParsedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse EPUB file");
      setParsedData([]);
    } finally {
      setLoading(false);
    }
  };

  const handle_confirm_import = async () => {
    if (parsed_data.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const week_count = parsed_data.length;
      await ClamDataService.importMeetingData(parsed_data);
      setImportedCount(week_count);
      setShowSuccessAlert(true);
      // Reset state
      setSelectedFile(null);
      setParsedData([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import meeting data");
    } finally {
      setLoading(false);
    }
  };

  const handle_cancel = () => {
    setSelectedFile(null);
    setParsedData([]);
    setError(null);
  };

  return (
    <>
      {!selected_file && (
        <EpubUpload
          on_file_select={handle_file_select}
          on_file_error={setFileError}
          loading={loading}
        />
      )}

      {parsed_data.length > 0 && (
        <DataPreview
          data={parsed_data}
          on_confirm={handle_confirm_import}
          on_cancel={handle_cancel}
          loading={loading}
        />
      )}

      {selected_file && !loading && !parsed_data.length && !error && (
        <div className="ion-text-center ion-padding">
          <p>Selected file: {selected_file.name}</p>
          <IonButton fill="outline" color="medium" onClick={handle_cancel}>
            Clear Selection
          </IonButton>
        </div>
      )}

      {loading && !parsed_data.length && (
        <div className="ion-text-center ion-padding">
          <IonSpinner name="crescent" />
          <p>Parsing EPUB file...</p>
        </div>
      )}

      {error && (
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header="Error"
          message={error}
          buttons={["OK"]}
        />
      )}

      {file_error && (
        <IonAlert
          isOpen={!!file_error}
          onDidDismiss={() => setFileError(null)}
          header="Invalid File"
          message={file_error}
          buttons={["OK"]}
        />
      )}

      <IonAlert
        isOpen={show_success_alert}
        onDidDismiss={() => setShowSuccessAlert(false)}
        header="Success"
        message={`Successfully imported ${imported_count} weeks of meeting data.`}
        buttons={["OK"]}
      />
    </>
  );
}
