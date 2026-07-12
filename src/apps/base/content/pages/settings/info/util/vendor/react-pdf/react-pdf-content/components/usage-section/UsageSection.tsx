import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [
  { label: "PdfViewer", value: "Wraps PDFViewer from @react-pdf/renderer. Props: width, height." },
  { label: "PdfDocument", value: "Root document wrapper. Accepts all DocumentProps." },
  { label: "PdfPage", value: "A4 page with a padding prop (default 30). Accepts all PageProps." },
  { label: "PdfView", value: "Flexbox container. Shortcut props: row, gap, flex." },
  {
    label: "PdfText",
    value: "Text with variant (h1–h3, body, caption, label), bold, and color props.",
  },
  { label: "PdfImage", value: "Image with width, height, and fit (objectFit) shortcut props." },
  { label: "PdfLink", value: "Hyperlink styled with underline. Props: color, plus all LinkProps." },
  { label: "PdfDivider", value: "Horizontal rule. Props: color, thickness, marginVertical." },
  {
    label: "PdfPageNumber",
    value: "Fixed footer showing page / total. Props: color, fontSize, align.",
  },
];

const code = `import { PdfViewer } from "@util/vendor/react-pdf/PdfViewer";
import { PdfDocument } from "@util/vendor/react-pdf/PdfDocument";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { PdfView } from "@util/vendor/react-pdf/PdfView";
import { PdfText } from "@util/vendor/react-pdf/PdfText";
import { PdfDivider } from "@util/vendor/react-pdf/PdfDivider";
import { PdfPageNumber } from "@util/vendor/react-pdf/PdfPageNumber";

function MyDocument() {
  return (
    <PdfDocument>
      <PdfPage padding={40}>
        <PdfText variant="h1">Hello World</PdfText>
        <PdfDivider />
        <PdfView row gap={8}>
          <PdfText variant="label">Name</PdfText>
          <PdfText>Jane Doe</PdfText>
        </PdfView>
        <PdfPageNumber align="center" />
      </PdfPage>
    </PdfDocument>
  );
}

// Render inline with a fixed height container:
<div style={{ height: 480 }}>
  <PdfViewer>
    <MyDocument />
  </PdfViewer>
</div>`;

export function UsageSection() {
  return (
    <ModuleSection
      title="Usage"
      path="src/util/vendor/react-pdf/"
      description="Compose PDF documents using the typed utility components. Wrap with PdfViewer to preview inline."
      items={items}
    >
      <IonItem>
        <Body>
          <strong>Example</strong>
        </Body>
      </IonItem>
      <IonItem lines="none">
        <pre
          style={{
            margin: 0,
            width: "100%",
            whiteSpace: "pre-wrap",
            fontSize: "0.8125rem",
          }}
        >
          {code}
        </pre>
      </IonItem>
    </ModuleSection>
  );
}
