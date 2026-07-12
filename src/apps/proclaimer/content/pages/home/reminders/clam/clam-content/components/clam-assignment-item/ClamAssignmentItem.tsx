import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { ClamAssignmentDownload } from "../clam-assignment-download/ClamAssignmentDownload";
import type { Publisher } from "@shared/database/schemas/publisher";

type ClamAssignmentItemProps = {
  week_label: string;
  school: string;
  label: string;
  material: string;
  student?: Publisher;
  assistant?: Publisher;
  counselor?: Publisher;
  filename: string;
};

export function ClamAssignmentItem({
  week_label,
  school,
  label,
  material,
  student,
  assistant,
  counselor,
  filename,
}: ClamAssignmentItemProps) {
  if (!student) {
    return null;
  }

  return (
    <IonItem>
      <IonLabel>
        <Body bold>{label}</Body>
        <br />
        <Body size="sm" color="medium">
          {getPublisherDisplayName(student)}
        </Body>
      </IonLabel>
      <ClamAssignmentDownload
        data={{
          date: week_label,
          school,
          student: getPublisherDisplayName(student, "first_last"),
          assistant: assistant ? getPublisherDisplayName(assistant, "first_last") : undefined,
          counselor: counselor ? getPublisherDisplayName(counselor, "first_last") : "",
          assignment: label,
          material,
        }}
        filename={filename}
      />
    </IonItem>
  );
}
