import { IonItem, IonLabel, IonList, IonCheckbox } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import type { ParsedRow } from "../../../csv-upload/CsvUpload";

interface DuplicateReviewProps {
  rows: ParsedRow[];
  on_toggle_remove: (index: number) => void;
}

interface DuplicateGroup {
  key: string;
  indices: number[];
}

function findDuplicateGroups(rows: ParsedRow[]): DuplicateGroup[] {
  const groups: Record<string, number[]> = {};
  rows.forEach((row, i) => {
    if (row._remove) return;
    const key = `${row.map_id}|${row.publisher_id}|${row.checked_out_at}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(i);
  });
  return Object.values(groups)
    .filter((g) => g.length > 1)
    .map((indices) => ({
      key: indices[0].toString(),
      indices,
    }));
}

export function DuplicateReview({ rows, on_toggle_remove }: DuplicateReviewProps) {
  const groups = findDuplicateGroups(rows);

  if (groups.length === 0) return null;

  return (
    <>
      <Body>
        Duplicate entries found (same map, publisher, and check-out date). Review and remove
        duplicates:
      </Body>
      <Space size="sm" />
      {groups.map((group) => (
        <IonList key={group.key} inset>
          {group.indices.map((idx) => (
            <IonItem key={idx}>
              <IonCheckbox
                slot="start"
                checked={!rows[idx]._remove}
                onIonChange={() => on_toggle_remove(idx)}
              />
              <IonLabel>
                {rows[idx].map_name} — {rows[idx].publisher_name}
                <br />
                <Body>Out: {rows[idx].checked_out_at}</Body>
                {rows[idx].checked_in_at && (
                  <>
                    <br />
                    <Body>In: {rows[idx].checked_in_at}</Body>
                  </>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      ))}
    </>
  );
}
