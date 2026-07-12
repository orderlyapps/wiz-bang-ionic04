import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import type { ReactNode } from "react";
import type { LabelValue } from "@util/types/LabelValue";

type Props = {
  title: string;
  description: string;
  props: LabelValue[];
  children: ReactNode;
};

export function ComponentSection({ title, description, props, children }: Props) {
  return (
    <IonAccordion value={title}>
      <IonItem slot="header" lines="inset">
        <IonLabel className="ion-margin">
          <Heading size="xl">{title}</Heading>
        </IonLabel>
      </IonItem>

      <div slot="content">
        <IonItem lines="none">
          <Body>{description}</Body>
        </IonItem>

        <Space size="sm" />

        <IonItem>
          <Heading>Props</Heading>
        </IonItem>

        {props.map((prop) => (
          <LabelValueItem key={prop.label} label={prop.label} value={prop.value} />
        ))}

        <Space size="sm" />

        <IonItem>
          <Heading>Example</Heading>
        </IonItem>

        {children}

        <Space size="xl" />
      </div>
    </IonAccordion>
  );
}
