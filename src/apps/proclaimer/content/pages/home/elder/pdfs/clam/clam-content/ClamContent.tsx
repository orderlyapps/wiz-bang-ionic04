import { useState } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { MonthPicker } from "@proclaimer-content/pages/home/elder/pdfs/shared/components/month-picker/MonthPicker";
import { PdfPublisherSelect } from "@proclaimer-content/pages/home/elder/pdfs/shared/components/pdf-publisher-select/PdfPublisherSelect";
import { MidweekSchedulePdfDocument } from "./components/midweek-schedule-pdf/MidweekSchedulePdfDocument";
import { Space } from "@ui/components/layout/space/Space";
import { useMidweekScheduleData } from "./hooks/useMidweekScheduleData";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredPublisher } from "@proclaimer-shared/publisher/publisherUtils";

type MonthRange = {
  readonly firstMonday: string;
  readonly lastMonday: string;
};

export function ClamContent() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [selected_month, set_selected_month] = useState<MonthRange | null>(null);
  const [is_generating, set_is_generating] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);
  const [pdf_publisher, set_pdf_publisher] = useState<Publisher | null>(getStoredPublisher);
  const [highlight_publisher, set_highlight_publisher] = useState(false);

  const congregation = useStoredCongregation();
  const { weeks, isLoading } = useMidweekScheduleData(selected_month);

  const get_filename = () => {
    if (!selected_month) return "Midweek-Meeting";
    const first = format(new Date(selected_month.firstMonday), "MMM-d");
    const last = format(new Date(selected_month.lastMonday), "MMM-d-yyyy");
    return `Midweek-Meeting_${first}_${last}`;
  };

  const handle_download = async () => {
    if (!selected_month) return;
    set_is_generating(true);
    set_error_message(null);
    try {
      const blob = await pdf(
        <MidweekSchedulePdfDocument
          weeks={weeks}
          isLoading={isLoading}
          monthDate={selected_month.firstMonday}
          highlightPublisherId={highlight_publisher ? pdf_publisher?.id : undefined}
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
      <TextButton label="Midweek Meeting Schedule" on_click={() => set_is_modal_open(true)} />

      <ResponsiveModal
        isOpen={is_modal_open}
        onDidDismiss={() => {
          set_is_modal_open(false);
          set_selected_month(null);
          set_error_message(null);
        }}
        fullscreen={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <CloseIconButton on_click={() => set_is_modal_open(false)} skip_confirmation />
            </IonButtons>
            <IonTitle>Midweek Meeting Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <MonthPicker
            label="Select Month"
            value={selected_month ? selected_month.firstMonday.substring(0, 7) : undefined}
            onValueChange={set_selected_month}
          />

          <Space />

          {selected_month && (
            <ToggleInput
              label="Highlight Publisher"
              checked={highlight_publisher}
              on_change={set_highlight_publisher}
              disabled={!pdf_publisher}
            />
          )}

          <Space />

          {highlight_publisher && <PdfPublisherSelect on_change={set_pdf_publisher} />}

          <Space />

          {error_message && (
            <p
              style={{ color: "var(--ion-color-danger)", fontSize: "0.875rem", margin: "0.5rem 0" }}
            >
              {error_message}
            </p>
          )}

          {!congregation ? (
            <TextButton expand="block" disabled label="No congregation selected"></TextButton>
          ) : selected_month ? (
            <TextButton
              expand="block"
              disabled={is_generating || isLoading}
              on_click={handle_download}
              label={
                is_generating
                  ? "Generating..."
                  : isLoading
                    ? "Loading data..."
                    : `Download PDF (${format(new Date(selected_month.firstMonday), "MMM d")} - ${format(new Date(selected_month.lastMonday), "MMM d, yyyy")})`
              }
            ></TextButton>
          ) : (
            <TextButton expand="block" disabled label="Select a month to download"></TextButton>
          )}
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
