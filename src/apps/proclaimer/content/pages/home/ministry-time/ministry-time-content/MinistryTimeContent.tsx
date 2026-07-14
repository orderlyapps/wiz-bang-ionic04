import { useState } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { useMinistryTime, type MinistryTimeEntry } from "./hooks/useMinistryTime";
import { AddEntryFab } from "./components/add-entry-fab/AddEntryFab";
import { TimeEntryList } from "./components/time-entry-list/TimeEntryList";
import { EditEntryModal } from "./components/edit-entry-modal/EditEntryModal";
import { PioneerStats } from "./components/pioneer-stats/PioneerStats";
import { Body } from "@ui/components/display/text/body/Body";

export function MinistryTimeContent() {
  const { entries, addEntry, updateEntry, deleteEntry } = useMinistryTime();
  const [editing_entry, set_editing_entry] = useState<MinistryTimeEntry | null>(null);

  return (
    <>
      <IonItem>
        <IonLabel className="ion-text-center">
          <Body size="xs" color="medium">
            Your time entries and pioneer hour settings are stored locally on this device. Use the
            settings icon above to export a copy for safekeeping or to transfer to another device.
          </Body>
        </IonLabel>
      </IonItem>
      <Space size="sm" />
      <PioneerStats entries={entries} />
      <Space size="sm" />
      <TimeEntryList entries={entries} on_delete={deleteEntry} on_edit={set_editing_entry} />
      <AddEntryFab on_add={addEntry} />
      <Space />
      <EditEntryModal
        entry={editing_entry}
        on_update={updateEntry}
        on_close={() => set_editing_entry(null)}
      />
    </>
  );
}
