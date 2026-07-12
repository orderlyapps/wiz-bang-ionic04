import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface AssignmentInfoProps {
  title: string;
  color: IonicColor;
  context: string | undefined;
}

export function AssignmentInfo({ title, color, context }: AssignmentInfoProps) {
  return (
    <IonList>
      <LabelValueItem label={title} label_color={color} value_2={context} />
    </IonList>
  );
}
