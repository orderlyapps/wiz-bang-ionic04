import { IonItemDivider, IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { useBranchReportData } from "./hooks/use-branch-report-data/useBranchReportData";

export function BranchReportContent() {
  const { active_publishers_count } = useBranchReportData();

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
      <LabelValueItem label="Number of Reports" value="—" />
      <LabelValueItem label="Bible Studies" value="—" />
      <Space />
      <IonItemDivider sticky className="ion-padding">
        <Heading>Auxiliary Pioneers</Heading>
      </IonItemDivider>
      <LabelValueItem label="Number of Reports" value="—" />
      <LabelValueItem label="Hours" value="—" />
      <LabelValueItem label="Bible Studies" value="—" />
      <Space />
      <IonItemDivider sticky className="ion-padding">
        <Heading>Regular Pioneers</Heading>
      </IonItemDivider>
      <LabelValueItem label="Number of Reports" value="—" />
      <LabelValueItem label="Hours" value="—" />
      <LabelValueItem label="Bible Studies" value="—" />
    </IonList>
  );
}
