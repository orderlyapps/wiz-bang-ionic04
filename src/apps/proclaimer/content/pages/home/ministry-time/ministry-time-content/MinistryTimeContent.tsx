import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { useMinistryTime } from "./hooks/useMinistryTime";
import { WarningBanner } from "./components/warning-banner/WarningBanner";
import { AddEntryFab } from "./components/add-entry-fab/AddEntryFab";
import { TimeEntryList } from "./components/time-entry-list/TimeEntryList";

export function MinistryTimeContent() {
  const { entries, addEntry, deleteEntry, total_hours } = useMinistryTime();

  return (
    <>
      <IonItem lines="none" className="ion-text-center ion-padding">
        <IonLabel>
          <Heading size="sm" color="medium">
            Total Hours
          </Heading>
          <Space size="xs" />
          <Heading size="2xl" color="primary">
            {total_hours}h
          </Heading>
        </IonLabel>
      </IonItem>
      <Space size="sm" />
      <TimeEntryList entries={entries} on_delete={deleteEntry} />
      <AddEntryFab on_add={addEntry} />
      <Space />
      <WarningBanner />
    </>
  );
}
