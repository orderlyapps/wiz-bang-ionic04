import { IonSpinner } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { FileUploadButton } from "@ui/components/inputs/file/FileUploadButton";
import { Space } from "@ui/components/layout/space/Space";

interface EpubUploadProps {
  on_file_select: (file: File) => void;
  on_file_error?: (message: string) => void;
  loading?: boolean;
}

export function EpubUpload({ on_file_select, on_file_error, loading = false }: EpubUploadProps) {
  const handle_file_select = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".epub")) {
      on_file_error?.("Please select a valid EPUB file (.epub extension required)");
      return;
    }

    on_file_select(file);
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px" }}>
          <IonSpinner name="crescent" />
          <span>Processing...</span>
        </div>
      ) : (
        <>
          <div className="ion-text-center">
            <Body>Import midweek meeting data from EPUB files.</Body>
          </div>
          <Space />
          <FileUploadButton
            label="Choose EPUB File"
            accept=".epub"
            on_file_select={handle_file_select}
            loading={loading}
          />
        </>
      )}
    </>
  );
}
