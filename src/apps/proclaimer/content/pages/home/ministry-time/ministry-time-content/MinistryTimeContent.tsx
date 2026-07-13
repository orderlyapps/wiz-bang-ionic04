import { useState } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { useMinistryTime, type MinistryTimeEntry } from "./hooks/useMinistryTime";
import { WarningBanner } from "./components/warning-banner/WarningBanner";
import { AddEntryFab } from "./components/add-entry-fab/AddEntryFab";
import { TimeEntryList } from "./components/time-entry-list/TimeEntryList";
import { EditEntryModal } from "./components/edit-entry-modal/EditEntryModal";

export function MinistryTimeContent() {
  const { entries, addEntry, updateEntry, deleteEntry, total_hours } = useMinistryTime();
  const [editing_entry, set_editing_entry] = useState<MinistryTimeEntry | null>(null);

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
      <TimeEntryList entries={entries} on_delete={deleteEntry} on_edit={set_editing_entry} />
      <AddEntryFab on_add={addEntry} />
      <Space />
      <WarningBanner />
      <EditEntryModal
        entry={editing_entry}
        on_update={updateEntry}
        on_close={() => set_editing_entry(null)}
      />
    </>
  );
}
