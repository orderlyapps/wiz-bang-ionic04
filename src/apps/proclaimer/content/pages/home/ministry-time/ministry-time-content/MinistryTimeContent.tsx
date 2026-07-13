import { useState } from "react";
import { Space } from "@ui/components/layout/space/Space";
import { useMinistryTime, type MinistryTimeEntry } from "./hooks/useMinistryTime";
import { WarningBanner } from "./components/warning-banner/WarningBanner";
import { AddEntryFab } from "./components/add-entry-fab/AddEntryFab";
import { TimeEntryList } from "./components/time-entry-list/TimeEntryList";
import { EditEntryModal } from "./components/edit-entry-modal/EditEntryModal";
import { PioneerStats } from "./components/pioneer-stats/PioneerStats";

export function MinistryTimeContent() {
  const { entries, addEntry, updateEntry, deleteEntry } = useMinistryTime();
  const [editing_entry, set_editing_entry] = useState<MinistryTimeEntry | null>(null);

  return (
    <>
      <PioneerStats entries={entries} />
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
