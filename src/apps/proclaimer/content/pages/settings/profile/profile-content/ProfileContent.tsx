import { useState } from "react";
import { IonList } from "@ionic/react";
import { PublisherSelect } from "./components/publisher-select/PublisherSelect";
import { PublisherSignIn } from "./components/publisher-sign-in/PublisherSignIn";
import { getStoredPublisher } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Space } from "@ui/components/layout/space/Space";

export function ProfileContent() {
  const [publisher, setPublisher] = useState<Publisher | null>(getStoredPublisher);

  return (
    <IonList inset lines="none">
      <PublisherSelect on_change={setPublisher} />
      <Space />
      <PublisherSignIn publisher={publisher} />
    </IonList>
  );
}
