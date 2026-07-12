import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapCollection } from "@shared/database/collections/map";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapRow } from "@shared/database/schemas/map";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { MapLogPdf } from "../map-log-pdf/MapLogPdf";
import type { MapLogPdfEntry, MapLogPdfRow } from "../map-log-pdf/map-log-pdf-styles";

function buildPdfRows(
  maps: MapRow[],
  all_logs: MapLogRow[],
  publishers: Publisher[],
): MapLogPdfRow[] {
  const publisher_name_by_id = new Map(
    publishers.map((p) => [p.id ?? "", getPublisherDisplayName(p, "first_last")]),
  );

  const sorted_maps = [...maps].sort((a, b) => a.name.localeCompare(b.name));

  return sorted_maps.map((map) => {
    const map_logs = all_logs
      .filter((log) => log.map_id === map.id)
      .sort((a, b) => (b.checked_out_at ?? "").localeCompare(a.checked_out_at ?? ""));

    const displayed = map_logs.slice(0, 4);
    const remaining = map_logs.slice(4);

    const last_date_completed =
      remaining.map((log) => log.checked_in_at).find((date) => date != null) ?? null;

    const logs: MapLogPdfEntry[] = displayed.reverse().map((log) => ({
      publisher_name: publisher_name_by_id.get(log.publisher_id) ?? "",
      checked_out_at: log.checked_out_at ?? null,
      checked_in_at: log.checked_in_at ?? null,
    }));

    return { map_name: map.name, last_date_completed, logs };
  });
}

export function MapLogDownload() {
  const [is_generating, set_is_generating] = useState(false);
  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const has_data = !!maps_data?.length && !!logs_data?.length && !!publishers_data?.length;

  const handle_download = async () => {
    set_is_generating(true);
    try {
      const maps = (maps_data as MapRow[] | undefined) ?? [];
      const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
      const publishers = (publishers_data as Publisher[] | undefined) ?? [];
      const rows = buildPdfRows(maps, all_logs, publishers);

      const blob = await pdf(<MapLogPdf rows={rows} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Map_Log_S-13.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <IonButton
      expand="block"
      fill="outline"
      onClick={handle_download}
      disabled={is_generating || !has_data}
    >
      {is_generating ? (
        <>
          <IonSpinner name="crescent" style={{ marginRight: 8 }} />
          Generating...
        </>
      ) : (
        "Territory Assignment Record (S-13)"
      )}
    </IonButton>
  );
}
