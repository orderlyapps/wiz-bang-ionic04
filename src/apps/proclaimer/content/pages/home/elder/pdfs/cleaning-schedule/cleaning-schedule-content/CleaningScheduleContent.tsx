import { useState } from "react";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { BimonthlyPicker } from "./components/bimonthly-picker/BimonthlyPicker";
import { CleaningSchedulePdfDocument } from "./components/cleaning-schedule-pdf/CleaningSchedulePdfDocument";
import { useCleaningScheduleData } from "./hooks/useCleaningScheduleData";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";

type BimonthlyRange = {
  readonly firstMonday: string;
  readonly lastMonday: string;
};

export function CleaningScheduleContent() {
  const [selected_range, set_selected_range] = useState<BimonthlyRange | null>(null);
  const [is_generating, set_is_generating] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);

  const congregation = useStoredCongregation();
  const { weeks, isLoading } = useCleaningScheduleData(selected_range);

  const get_filename = () => {
    if (!selected_range) return "Cleaning-Schedule";
    const first = format(new Date(selected_range.firstMonday), "MMM-d");
    const last = format(new Date(selected_range.lastMonday), "MMM-d-yyyy");
    return `Cleaning-Schedule_${first}_${last}`;
  };

  const handle_download = async () => {
    if (!selected_range) return;
    set_is_generating(true);
    set_error_message(null);
    try {
      const blob = await pdf(
        <CleaningSchedulePdfDocument
          weeks={weeks}
          isLoading={isLoading}
          dateRange={selected_range}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${get_filename()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      set_error_message("Failed to generate PDF. Please try again.");
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <>
      <BimonthlyPicker
        label="Select Period"
        value={selected_range ? selected_range.firstMonday.substring(0, 7) : undefined}
        onValueChange={set_selected_range}
      />

      <Space />

      {error_message && (
        <p style={{ color: "var(--ion-color-danger)", fontSize: "0.875rem", margin: "0.5rem 0" }}>
          {error_message}
        </p>
      )}

      {!congregation ? (
        <TextButton expand="block" disabled label="No congregation selected" />
      ) : selected_range ? (
        <TextButton
          expand="block"
          disabled={is_generating || isLoading}
          on_click={handle_download}
          label={
            is_generating
              ? "Generating..."
              : isLoading
                ? "Loading data..."
                : `Download PDF (${format(new Date(selected_range.firstMonday), "MMM d")} - ${format(new Date(selected_range.lastMonday), "MMM d, yyyy")})`
          }
        />
      ) : (
        <TextButton expand="block" disabled label="Select a period to download" />
      )}
    </>
  );
}
