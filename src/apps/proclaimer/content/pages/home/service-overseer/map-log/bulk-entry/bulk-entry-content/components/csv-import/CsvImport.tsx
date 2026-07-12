import { useState } from "react";
import { CsvTemplateDownload } from "./components/csv-template-download/CsvTemplateDownload";
import { CsvUpload, type ParsedRow } from "./components/csv-upload/CsvUpload";
import { ValidationSummary } from "./components/validation-summary/ValidationSummary";
import { ImportPreview } from "./components/import-preview/ImportPreview";

type Step = "upload" | "validation" | "preview";

export function CsvImport() {
  const [step, set_step] = useState<Step>("upload");
  const [rows, set_rows] = useState<ParsedRow[]>([]);
  const [validated_rows, set_validated_rows] = useState<ParsedRow[]>([]);

  function handleParsed(parsed: ParsedRow[]) {
    set_rows(parsed);
    set_step("validation");
  }

  function handleValidationDone(resolved: ParsedRow[]) {
    set_validated_rows(resolved);
    set_step("preview");
  }

  function handleImportComplete() {
    set_rows([]);
    set_validated_rows([]);
    set_step("upload");
  }

  if (step === "upload") {
    return (
      <>
        <CsvTemplateDownload />
        <CsvUpload on_parsed={handleParsed} />
      </>
    );
  }

  if (step === "validation") {
    return <ValidationSummary rows={rows} on_done={handleValidationDone} />;
  }

  return <ImportPreview rows={validated_rows} on_complete={handleImportComplete} />;
}
