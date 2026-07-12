import { useState } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { FileUploadButton } from "@ui/components/inputs/file/FileUploadButton";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

export interface ParsedRow {
  map_name: string;
  publisher_name: string;
  checked_out_at: string;
  checked_in_at: string;
  notes: string;
  map_id?: string;
  publisher_id?: string;
  _remove?: boolean;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let in_quotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (in_quotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          in_quotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        in_quotes = true;
      } else if (char === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

function normalizeDate(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const m = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const day = m[1].padStart(2, "0");
    const month = m[2].padStart(2, "0");
    return `${m[3]}-${month}-${day}`;
  }
  return trimmed;
}

function parseCsv(text: string): ParsedRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const col_map: Record<string, number> = {};
  headers.forEach((h, i) => {
    col_map[h] = i;
  });

  const rows: ParsedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    rows.push({
      map_name: fields[col_map["map_name"] ?? 0] ?? "",
      publisher_name: fields[col_map["publisher_name"] ?? 1] ?? "",
      checked_out_at: normalizeDate(fields[col_map["checked_out_at"] ?? 2] ?? ""),
      checked_in_at: normalizeDate(fields[col_map["checked_in_at"] ?? 3] ?? ""),
      notes: fields[col_map["notes"] ?? 4] ?? "",
    });
  }
  return rows;
}

interface CsvUploadProps {
  on_parsed: (rows: ParsedRow[]) => void;
}

export function CsvUpload({ on_parsed }: CsvUploadProps) {
  const [error, set_error] = useState<string | null>(null);

  function handleFileSelect(files: FileList) {
    const file = files[0];
    if (!file) return;
    set_error(null);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = parseCsv(text);
      if (rows.length === 0) {
        set_error("No data rows found in CSV file.");
        return;
      }
      on_parsed(rows);
    };
    reader.onerror = () => set_error("Failed to read file.");
    reader.readAsText(file);
  }

  return (
    <>
      <div className="ion-text-center">
        <Body>Upload a filled-in CSV file to import map log entries.</Body>
      </div>
      <Space />
      <FileUploadButton label="Upload CSV" accept=".csv" on_file_select={handleFileSelect} />
      {error && (
        <IonItem>
          <IonLabel color="danger">{error}</IonLabel>
        </IonItem>
      )}
    </>
  );
}
