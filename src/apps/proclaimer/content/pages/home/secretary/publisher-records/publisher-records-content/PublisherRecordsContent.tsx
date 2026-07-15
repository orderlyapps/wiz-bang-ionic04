import { IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import {
  usePublisherRecordsData,
  GROUP_LABELS,
  type PublisherGroup,
} from "./hooks/usePublisherRecordsData";
import { DownloadGroupButton } from "./components/download-group-button/DownloadGroupButton";

const GROUPS: PublisherGroup[] = [
  "elders",
  "ministerial_servants",
  "pioneers",
  "brothers",
  "inactive",
];

export function PublisherRecordsContent() {
  const { getEntriesForGroup, getGroupCount } = usePublisherRecordsData();

  const total = GROUPS.reduce((sum, g) => sum + getGroupCount(g), 0);

  if (total === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No publishers found.</Body>
      </div>
    );
  }

  return (
    <>
      <IonList>
        {GROUPS.map((group) => (
          <DownloadGroupButton
            key={group}
            label={GROUP_LABELS[group]}
            count={getGroupCount(group)}
            get_entries={() => getEntriesForGroup(group)}
          />
        ))}
      </IonList>
      <Space />
      <div className="ion-padding ion-text-center">
        <Body color="medium">
          Each download includes two years of records per publisher, one publisher per page.
        </Body>
      </div>
    </>
  );
}
