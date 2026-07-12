import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { GroupsPdf } from "../groups-pdf/GroupsPdf";
import { PdfActionSheet, type PdfFilterType } from "../pdf-action-sheet/PdfActionSheet";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Group } from "@shared/database/schemas/group";
import { PDFIconButton } from "@ui/components/inputs/button/icon/pdf/PDFIconButton";

export function DownloadPdfButton() {
  const [is_modal_open, set_is_modal_open] = useState(false);
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
    return null;
  }

  const handle_download = async (filter_type: PdfFilterType) => {
    set_is_generating(true);
    set_is_modal_open(false);

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
      <PDFIconButton
        fill="clear"
        disabled={is_generating}
        on_click={() => set_is_modal_open(true)}
      />

      <PdfActionSheet
        is_open={is_modal_open}
        on_select={handle_download}
        on_dismiss={() => set_is_modal_open(false)}
      />
    </>
  );
}
