import { useState } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { BimonthlyPicker } from "./components/bimonthly-picker/BimonthlyPicker";
import { SpeakerSchedulePdf } from "./components/speaker-schedule-pdf/SpeakerSchedulePdf";
import { useSpeakerScheduleData } from "./hooks/useSpeakerScheduleData";

type BimonthlyRange = {
  readonly firstMonday: string;
  readonly lastMonday: string;
};

export function PdfContent() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [selected_range, set_selected_range] = useState<BimonthlyRange | null>(null);
  const [is_generating, set_is_generating] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);

  const congregation = useStoredCongregation();
  const { weeks, isLoading } = useSpeakerScheduleData(selected_range);

  const get_filename = () => {
    if (!selected_range) return "Speaker-Schedule";
    const first = format(new Date(selected_range.firstMonday), "MMM-d");
    const last = format(new Date(selected_range.lastMonday), "MMM-d-yyyy");
    return `Speaker-Schedule_${first}_${last}`;
  };

  const handle_download = async () => {
    if (!selected_range) return;
    set_is_generating(true);
    set_error_message(null);
    try {
      const blob = await pdf(
        <SpeakerSchedulePdf
          weeks={weeks}
          isLoading={isLoading}
          dateRange={selected_range}
          congregation_name={congregation?.name}
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
      <TextButton label="Speaker Schedule" on_click={() => set_is_modal_open(true)} />

      <ResponsiveModal
        isOpen={is_modal_open}
        onDidDismiss={() => {
          set_is_modal_open(false);
          set_selected_range(null);
          set_error_message(null);
        }}
        fullscreen={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <CloseIconButton on_click={() => set_is_modal_open(false)} skip_confirmation />
            </IonButtons>
            <IonTitle>Speaker Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <BimonthlyPicker
            label="Select Period"
            value={selected_range ? selected_range.firstMonday.substring(0, 7) : undefined}
            onValueChange={set_selected_range}
          />

          <Space />

          {error_message && (
            <p
              style={{ color: "var(--ion-color-danger)", fontSize: "0.875rem", margin: "0.5rem 0" }}
            >
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
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
