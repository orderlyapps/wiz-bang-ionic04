import { IonItemDivider, IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { useBranchReportData } from "./hooks/use-branch-report-data/useBranchReportData";

export function BranchReportContent() {
  const {
    active_publishers_count,
    publisher_reports_count,
    publisher_bible_studies,
    aux_pio_reports_count,
    aux_pio_hours,
    aux_pio_bible_studies,
    regular_pio_reports_count,
    regular_pio_hours,
    regular_pio_bible_studies,
  } = useBranchReportData();

  return (
    <IonList>
      <IonItemDivider sticky className="ion-padding">
        <Heading>Congregation</Heading>
      </IonItemDivider>
      <LabelValueItem label="All Active Publishers" value={String(active_publishers_count)} />
      <LabelValueItem label="Average Weekend Meeting Attendance" value="—" />
      <Space />
      <IonItemDivider sticky className="ion-padding">
        <Heading>Publishers</Heading>
      </IonItemDivider>
      <LabelValueItem label="Number of Reports" value={String(publisher_reports_count)} />
      <LabelValueItem label="Bible Studies" value={String(publisher_bible_studies)} />
      <Space />
      <IonItemDivider sticky className="ion-padding">
        <Heading>Auxiliary Pioneers</Heading>
      </IonItemDivider>
      <LabelValueItem label="Number of Reports" value={String(aux_pio_reports_count)} />
      <LabelValueItem label="Hours" value={String(aux_pio_hours)} />
      <LabelValueItem label="Bible Studies" value={String(aux_pio_bible_studies)} />
      <Space />
      <IonItemDivider sticky className="ion-padding">
        <Heading>Regular Pioneers</Heading>
      </IonItemDivider>
      <LabelValueItem label="Number of Reports" value={String(regular_pio_reports_count)} />
      <LabelValueItem label="Hours" value={String(regular_pio_hours)} />
      <LabelValueItem label="Bible Studies" value={String(regular_pio_bible_studies)} />
    </IonList>
  );
}
