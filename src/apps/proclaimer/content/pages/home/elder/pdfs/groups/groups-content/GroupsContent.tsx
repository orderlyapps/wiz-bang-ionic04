import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { GroupsPdf } from "@proclaimer-content/pages/home/secretary/groups/groups-header/components/groups-pdf/GroupsPdf";
import type { PdfFilterType } from "@proclaimer-content/pages/home/secretary/groups/groups-header/components/pdf-action-sheet/PdfActionSheet";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Group } from "@shared/database/schemas/group";

export function GroupsContent() {
  const [is_generating, set_is_generating] = useState(false);

  const congregation = getStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: groups_data } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const groups = (groups_data ?? []).filter(
    (g) => g.congregation_id === congregation_id,
  ) as Group[];
  const publishers = (publishers_data ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  ) as Publisher[];

  if (groups.length === 0) {
    return <p style={{ color: "var(--ion-color-medium)" }}>No groups available.</p>;
  }

  const handle_download = async (filter_type: PdfFilterType) => {
    set_is_generating(true);

    const file_name = congregation?.name
      ? `${congregation.name.replace(/\s+/g, "_")}_Groups_${filter_type}.pdf`
      : `Field_Service_Groups_${filter_type}.pdf`;

    const blob = await pdf(
      <GroupsPdf
        groups={groups}
        publishers={publishers}
        congregation_name={congregation?.name}
        filter_type={filter_type}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    set_is_generating(false);
  };

  return (
    <>
      <TextButton
        expand="block"
        disabled={is_generating}
        on_click={() => handle_download("default")}
        label={is_generating ? "Generating..." : "Notice Board List"}
      />

      <Space />

      <TextButton
        expand="block"
        disabled={is_generating}
        on_click={() => handle_download("confidential")}
        label={is_generating ? "Generating..." : "Confidential List"}
      />
    </>
  );
}
