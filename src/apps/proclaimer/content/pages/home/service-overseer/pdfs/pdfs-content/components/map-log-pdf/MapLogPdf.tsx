import { PdfDocument } from "@util/vendor/react-pdf/PdfDocument";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { PdfText } from "@util/vendor/react-pdf/PdfText";
import { PdfView } from "@util/vendor/react-pdf/PdfView";
import { shared } from "./map-log-pdf-styles";
import type { MapLogPdfRow } from "./map-log-pdf-styles";
import { MapLogPdfTableRow } from "./components/map-log-pdf-table-row/MapLogPdfTableRow";

const ROWS_PER_PAGE = 20;

function chunkRows(rows: MapLogPdfRow[], size: number): MapLogPdfRow[][] {
  const chunks: MapLogPdfRow[][] = [];
  for (let i = 0; i < rows.length; i += size) {
    chunks.push(rows.slice(i, i + size));
  }
  if (chunks.length === 0) chunks.push([]);
  return chunks;
}

interface MapLogPdfProps {
  rows: MapLogPdfRow[];
}

export function MapLogPdf({ rows }: MapLogPdfProps) {
  const pages = chunkRows(rows, ROWS_PER_PAGE);

  return (
    <PdfDocument>
      {pages.map((pageRows, pageIndex) => (
        <PdfPage key={pageIndex}>
          <PdfView fixed>
            <PdfText style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>
              TERRITORY ASSIGNMENT RECORD
            </PdfText>
            <PdfText style={{ textAlign: "left", marginTop: 0, fontSize: 12, fontWeight: "bold" }}>
              Service Year: {new Date().getFullYear()}
            </PdfText>
          </PdfView>
          <PdfView style={shared.table}>
            <MapLogPdfTableRow isHeader />
            {Array.from({ length: ROWS_PER_PAGE }, (_, i) => (
              <MapLogPdfTableRow key={i} isLast={i === ROWS_PER_PAGE - 1} data={pageRows[i]} />
            ))}
          </PdfView>
          <PdfView style={shared.footer} fixed>
            <PdfText variant="caption" style={{ marginBottom: 2 }}>
              * When beginning a new sheet, use this column to record the date on which each
              territory was last completed.
            </PdfText>
            <PdfText variant="caption">S-13-E 1/22</PdfText>
          </PdfView>
        </PdfPage>
      ))}
    </PdfDocument>
  );
}
