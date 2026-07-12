import { IonItem } from "@ionic/react";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";
import { PdfViewer } from "@util/vendor/react-pdf/PdfViewer";
import { PdfDocument } from "@util/vendor/react-pdf/PdfDocument";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { PdfView } from "@util/vendor/react-pdf/PdfView";
import { PdfText } from "@util/vendor/react-pdf/PdfText";
import { PdfDivider } from "@util/vendor/react-pdf/PdfDivider";
import { PdfPageNumber } from "@util/vendor/react-pdf/PdfPageNumber";

const rows = [
  { label: "Name", value: "Jane Doe" },
  { label: "Date", value: "18 May 2026" },
  { label: "Amount", value: "$1,200.00" },
];

function ExampleDocument() {
  return (
    <PdfDocument>
      <PdfPage padding={40}>
        <PdfText variant="h1">Example Document</PdfText>
        <PdfText variant="body">
          This PDF is built using the utility components from src/util/vendor/react-pdf. Each
          component wraps a @react-pdf/renderer primitive with convenience props.
        </PdfText>

        <PdfDivider marginVertical={12} />

        <PdfText variant="label">Sample Data</PdfText>
        {rows.map((row) => (
          <PdfView key={row.label} row style={{ justifyContent: "space-between", marginBottom: 4 }}>
            <PdfText variant="caption" color="#555555">
              {row.label}
            </PdfText>
            <PdfText variant="caption">{row.value}</PdfText>
          </PdfView>
        ))}

        <PdfDivider marginVertical={12} />

        <PdfText variant="body">
          Wrap the document in PdfViewer to preview it inline during development.
        </PdfText>

        <PdfPageNumber align="center" />
      </PdfPage>
    </PdfDocument>
  );
}

const items = [
  { label: "PdfDocument", value: "Root wrapper — replaces Document from @react-pdf/renderer." },
  { label: "PdfPage", value: "A4 page with padding prop — replaces Page + StyleSheet." },
  { label: "PdfView", value: "Flexbox container with row, gap, flex shortcuts." },
  { label: "PdfText", value: "Typed text with variant, bold, and color props." },
  { label: "PdfDivider", value: "Horizontal rule with color, thickness, marginVertical." },
  { label: "PdfPageNumber", value: "Fixed page number footer with align, color, fontSize." },
];

export function ExampleSection() {
  return (
    <ModuleSection
      title="Example"
      path="src/util/vendor/react-pdf/"
      description="A live preview built entirely with the utility components."
      items={items}
    >
      <IonItem lines="none">
        <div style={{ width: "100%", height: 480, paddingBlock: 8 }}>
          <PdfViewer>
            <ExampleDocument />
          </PdfViewer>
        </div>
      </IonItem>
    </ModuleSection>
  );
}
