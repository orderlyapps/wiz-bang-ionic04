import { Fragment, useState } from "react";
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Label } from "@ui/components/display/text/label/Label";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { CheckoutModal } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/checkout-modal/CheckoutModal";

function formatDate(date_str: string | null | undefined): string {
  if (!date_str) return "—";
  const date = new Date(date_str);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(
  checked_out_at: string | null | undefined,
  checked_in_at: string | null | undefined,
): { text: string; is_warning: boolean } {
  if (!checked_out_at || !checked_in_at) return { text: "", is_warning: false };
  const start = new Date(checked_out_at);
  const end = new Date(checked_in_at);
  const ms = end.getTime() - start.getTime();
  if (ms < 0) return { text: "", is_warning: false };
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days <= 21) return { text: `${days}d`, is_warning: false };
  const weeks = Math.floor(days / 7);
  if (weeks <= 26) return { text: `${weeks}w`, is_warning: weeks > 17 };
  const months = Math.floor(days / 30);
  return { text: `${months}m`, is_warning: true };
}

function formatGapDuration(
  from_date: string | null | undefined,
  to_date: string | null | undefined,
): { text: string; is_warning: boolean } {
  if (!from_date || !to_date) return { text: "", is_warning: false };
  const start = new Date(from_date);
  const end = new Date(to_date);
  const ms = end.getTime() - start.getTime();
  if (ms < 0) return { text: "", is_warning: false };
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days <= 21) return { text: `${days}d`, is_warning: false };
  const weeks = Math.floor(days / 7);
  if (weeks <= 26) return { text: `${weeks}w`, is_warning: false };
  const months = Math.floor(days / 30);
  return { text: `${months}m`, is_warning: months > 12 };
}

function getPublisherName(publisher_id: string, publishers: Publisher[]): string {
  const publisher = publishers.find((p) => p.id === publisher_id);
  if (!publisher) return "Unknown";
  return getPublisherDisplayName(publisher);
}

interface MapLogListProps {
  map_id: string;
}

export function MapLogList({ map_id }: MapLogListProps) {
  const [editing_log, set_editing_log] = useState<MapLogRow | undefined>(undefined);
  const [show_new_checkout, set_show_new_checkout] = useState(false);
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const map_logs = all_logs
    .filter((log) => log.map_id === map_id)
    .sort((a, b) => (b.checked_out_at ?? "").localeCompare(a.checked_out_at ?? ""));

  const has_checked_out = map_logs.some((log) => !log.checked_in_at);

  return (
    <IonList>
      <Space size="sm" />
      {map_logs.length === 0 && (
        <>
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No logs for this map yet.</p>
            </IonLabel>
          </IonItem>
          <Space size="lg" />
        </>
      )}
      {!has_checked_out && (
        <>
          <TextButton label="Check Out" on_click={() => set_show_new_checkout(true)} />
          <Space size="sm" />
        </>
      )}
      {map_logs.map((log, index) => {
        const is_first = index === 0;
        const next_checked_out = is_first
          ? new Date().toISOString()
          : map_logs[index - 1]?.checked_out_at;
        const gap = formatGapDuration(log.checked_out_at, next_checked_out);
        const checkout_end =
          is_first && !log.checked_in_at ? new Date().toISOString() : log.checked_in_at;
        return (
          <Fragment key={log.id}>
            {gap.text && log.checked_in_at && (
              <IonItem lines="none" className="ion-text-center ion-padding">
                <IonLabel>
                  <Body size="lg" bold color={gap.is_warning ? "warning" : undefined}>
                    {gap.text}
                  </Body>
                </IonLabel>
              </IonItem>
            )}
            <IonItem button detail={false} onClick={() => set_editing_log(log)}>
              <IonLabel>
                <Label>{getPublisherName(log.publisher_id, all_publishers)}</Label>

                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-text-start">{formatDate(log.checked_out_at)}</IonCol>
                    <IonCol className="ion-text-center">
                      {(() => {
                        const { text, is_warning } = formatDuration(
                          log.checked_out_at,
                          checkout_end,
                        );
                        return text ? (
                          <Body size="sm" color={is_warning ? "warning" : undefined}>
                            {text}
                          </Body>
                        ) : null;
                      })()}
                    </IonCol>
                    <IonCol className="ion-text-end">{formatDate(log.checked_in_at)}</IonCol>
                  </IonRow>
                </IonGrid>

                {log.notes && (
                  <>
                    <br />
                    <Body>{log.notes}</Body>
                  </>
                )}
              </IonLabel>
            </IonItem>
          </Fragment>
        );
      })}
      {(editing_log || show_new_checkout) && (
        <CheckoutModal
          key={editing_log?.id ?? "new"}
          isOpen
          onDidDismiss={() => {
            set_editing_log(undefined);
            set_show_new_checkout(false);
          }}
          existing_log={editing_log}
          map_id={map_id}
        />
      )}
    </IonList>
  );
}
