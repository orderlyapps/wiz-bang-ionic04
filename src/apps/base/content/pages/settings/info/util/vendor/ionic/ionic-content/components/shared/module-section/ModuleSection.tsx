import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import type { ReactNode } from "react";

type Props = {
  title: string;
  path: string;
  description: string;
  items: { label: string; value: string }[];
  children?: ReactNode;
};

export function ModuleSection({ title, path, description, items, children }: Props) {
  return (
    <IonAccordion value={title}>
      <IonItem slot="header" lines="inset">
        <IonLabel className="ion-margin">
          <Heading size="xl">{title}</Heading>
        </IonLabel>
      </IonItem>

      <div slot="content">
        <IonItem lines="none">
          <Body size="sm" color="medium">
            {path}
          </Body>
        </IonItem>

        <IonItem lines="none">
          <Body>{description}</Body>
        </IonItem>

        <Space size="sm" />

        <IonItem>
          <Heading>Contents</Heading>
        </IonItem>

        {items.map((item) => (
          <IonItem key={item.label} lines="none">
            <Body>
              <strong>{item.label}</strong> — {item.value}
            </Body>
          </IonItem>
        ))}

        {children ? (
          <>
            <Space size="sm" />
            {children}
          </>
        ) : null}

        <Space size="xl" />
      </div>
    </IonAccordion>
  );
}
