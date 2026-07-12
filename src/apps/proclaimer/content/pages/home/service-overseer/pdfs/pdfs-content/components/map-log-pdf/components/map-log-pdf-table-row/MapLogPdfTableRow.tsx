import { PdfText } from "@util/vendor/react-pdf/PdfText";
import { PdfView } from "@util/vendor/react-pdf/PdfView";
import { bodyStyles, headerStyles, shared } from "../../map-log-pdf-styles";
import type { MapLogPdfRow } from "../../map-log-pdf-styles";

function formatDate(date_str: string | null | undefined): string {
  if (!date_str) return "";
  const date = new Date(date_str);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface MapLogPdfTableRowProps {
  isHeader?: boolean;
  isLast?: boolean;
  data?: MapLogPdfRow;
}

export function MapLogPdfTableRow({ isHeader, isLast, data }: MapLogPdfTableRowProps) {
  const rowStyle = isHeader ? headerStyles.row : isLast ? bodyStyles.rowLast : bodyStyles.row;
  const logs = data?.logs ?? [];

  return (
    <PdfView row style={rowStyle}>
      <PdfView row style={isHeader ? headerStyles.firstCol : shared.firstCol}>
        <PdfView style={isHeader ? headerStyles.firstColSub : shared.firstColSub}>
          {isHeader ? (
            <PdfText style={headerStyles.text}>{"Terr.\nno."}</PdfText>
          ) : (
            <PdfText style={bodyStyles.text}>{data?.map_name ?? ""}</PdfText>
          )}
        </PdfView>
        <PdfView style={isHeader ? headerStyles.firstColSubLast : shared.firstColSubLast}>
          {isHeader ? (
            <PdfText style={headerStyles.text}>{"Last date\ncompleted*"}</PdfText>
          ) : (
            <PdfText style={bodyStyles.text}>{formatDate(data?.last_date_completed)}</PdfText>
          )}
        </PdfView>
      </PdfView>
      {[0, 1, 2, 3].map((i) => (
        <PdfView key={i} style={i < 3 ? shared.rightCol : shared.rightColLast}>
          <PdfView style={isHeader ? headerStyles.rightColTop : shared.rightColTop}>
            {isHeader ? (
              <PdfText style={headerStyles.text}>Assigned to</PdfText>
            ) : (
              <PdfText style={bodyStyles.text}>{logs[i]?.publisher_name ?? ""}</PdfText>
            )}
          </PdfView>
          <PdfView row style={isHeader ? headerStyles.rightColBottom : shared.rightColBottom}>
            <PdfView style={isHeader ? headerStyles.rightColSubBottom : shared.rightColSubBottom}>
              {isHeader ? (
                <PdfText style={headerStyles.textDate}>{"Date\nassigned"}</PdfText>
              ) : (
                <PdfText style={bodyStyles.text}>{formatDate(logs[i]?.checked_out_at)}</PdfText>
              )}
            </PdfView>
            <PdfView
              style={isHeader ? headerStyles.rightColSubBottomLast : shared.rightColSubBottomLast}
            >
              {isHeader ? (
                <PdfText style={headerStyles.textDate}>{"Date\ncompleted"}</PdfText>
              ) : (
                <PdfText style={bodyStyles.text}>{formatDate(logs[i]?.checked_in_at)}</PdfText>
              )}
            </PdfView>
          </PdfView>
        </PdfView>
      ))}
    </PdfView>
  );
}
