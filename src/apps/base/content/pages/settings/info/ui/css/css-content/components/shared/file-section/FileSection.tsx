import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

type Props = {
  title: string;
  path: string;
  description: string;
  code?: string;
};

export function FileSection({ title, path, description, code }: Props) {
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

        {code ? (
          <>
            <Space size="sm" />
            <IonItem>
              <Heading>Source</Heading>
            </IonItem>
            <IonItem lines="none">
              <pre
                style={{
                  margin: 0,
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.8125rem",
                }}
              >
                {code}
              </pre>
            </IonItem>
          </>
        ) : null}

        <Space size="xl" />
      </div>
    </IonAccordion>
  );
}
