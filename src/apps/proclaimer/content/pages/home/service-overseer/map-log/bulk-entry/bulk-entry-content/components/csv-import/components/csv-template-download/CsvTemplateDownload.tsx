import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

const CSV_TEMPLATE = `map_name,publisher_name,checked_out_at,checked_in_at,notes
Downtown,"Smith, John",2024-01-15,2024-02-15,Optional notes
`;

export function CsvTemplateDownload() {
  function handleDownload() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "map-log-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="ion-text-center">
        <Body>Download a CSV template to fill in map log data.</Body>
      </div>
      <Space />
      <TextButton label="Download Template" on_click={handleDownload} />
    </>
  );
}
