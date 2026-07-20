import { useState } from "react";
import { IonList, IonItem, IonPopover, IonSpinner, useIonToast } from "@ionic/react";
import { useLiveQuery, eq, isNull, and } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPreviousMonthDate } from "@util/format/report-date";
import { PDFIconButton } from "@ui/components/inputs/button/icon/pdf/PDFIconButton";
import { Body } from "@ui/components/display/text/body/Body";
import { useReportFormGroups } from "./hooks/useReportFormGroups/useReportFormGroups";
import { GroupReportFormPdf } from "./group-report-form-pdf/GroupReportFormPdf";
import type { Publisher } from "@shared/database/schemas/publisher";

export function DownloadReportFormButton() {
  const { groups, can_download } = useReportFormGroups();
  const [popover_open, set_popover_open] = useState(false);
  const [is_generating, set_is_generating] = useState(false);
  const [presentToast] = useIonToast();
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: publishers_data } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => and(eq(p.congregation_id, congregation_id ?? ""), isNull(p.archived_at)))
        .orderBy(({ p }) => p.last_name),
    [congregation_id],
  );

  if (!can_download || groups.length === 0) {
    return null;
  }

  const report_date = getPreviousMonthDate();
  const month_label = new Date(report_date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const handle_download = async (group_id: string, group_name: string) => {
    set_popover_open(false);
    set_is_generating(true);

    const group_publishers = ((publishers_data ?? []) as Publisher[]).filter(
      (p) =>
        p.group_id === group_id &&
        p.type !== "inactive" &&
        p.type !== "speaker" &&
        p.type !== "associate" &&
        p.type !== "circuit_overseer",
    );

    if (group_publishers.length === 0) {
      set_is_generating(false);
      return;
    }

    try {
      const blob = await pdf(
        <GroupReportFormPdf
          group_name={group_name}
          congregation_name={congregation?.name}
          month_label={month_label}
          publishers={group_publishers}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${group_name.replace(/\s+/g, "_")}_Report_Form_${report_date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate report form PDF:", err);
      void presentToast({
        message: "Failed to generate report form. Please try again.",
        duration: 3000,
        color: "danger",
      });
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <>
      {is_generating ? (
        <IonSpinner name="crescent" slot="end" style={{ marginRight: 8 }} />
      ) : (
        <PDFIconButton
          fill="clear"
          disabled={is_generating}
          on_click={() => set_popover_open(true)}
        />
      )}
      <IonPopover isOpen={popover_open} onDidDismiss={() => set_popover_open(false)}>
        <IonList>
          {groups.map((group) => (
            <IonItem
              key={group.id}
              button
              detail={false}
              lines="none"
              onClick={() => handle_download(group.id ?? "", group.name)}
            >
              <Body>{group.name}</Body>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </>
  );
}
