import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export type SpeakerListItem = {
  id?: string;
  first_name: string;
  last_name: string;
  display_name?: string | null;
  subtitle?: string | null;
};

type SpeakerListProps = {
  speakers: SpeakerListItem[];
  empty_label: string;
  is_loading?: boolean;
  get_href?: (speaker: SpeakerListItem) => string;
};

export function SpeakerList({ speakers, empty_label, is_loading, get_href }: SpeakerListProps) {
  if (is_loading) {
    return <Spinner />;
  }

  if (speakers.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">{empty_label}</Body>
      </div>
    );
  }

  return (
    <IonList>
      {speakers.map((speaker, index) => (
        <IonItem key={speaker.id ?? index} routerLink={get_href?.(speaker)} button={!!get_href}>
          <IonLabel>{getPublisherDisplayName(speaker)}</IonLabel>
          {speaker.subtitle && (
            <Body slot="end" color="medium" size="sm">
              {speaker.subtitle}
            </Body>
          )}
        </IonItem>
      ))}
    </IonList>
  );
}
