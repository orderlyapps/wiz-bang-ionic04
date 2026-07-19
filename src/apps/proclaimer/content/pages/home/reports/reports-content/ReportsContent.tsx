import { useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { Select } from "@ui/components/inputs/select/Select";
import { getPreviousMonthDate } from "@util/format/report-date";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { usePermissionedPublishers } from "./hooks/usePermissionedPublishers";
import { useReportedPublisherIds } from "./hooks/useReportedPublisherIds";
import { useCongregationGroups } from "./hooks/useCongregationGroups";
import { PublisherReportItem } from "./components/publisher-report-item/PublisherReportItem";

export function ReportsContent() {
  const { publishers, has_access, isLoading } = usePermissionedPublishers();
  const { has_secretary } = usePermissions();
  const { groups } = useCongregationGroups();
  const report_date = getPreviousMonthDate();
  const { reported_publisher_ids } = useReportedPublisherIds(report_date);
  const [show_missing_only, set_show_missing_only] = useState(false);
  const [selected_group_id, set_selected_group_id] = useState<string | null>(null);

  if (isLoading) {
    return (
      <IonItem lines="none" className="ion-text-center ion-margin ion-padding">
        <IonLabel color="medium">Loading...</IonLabel>
      </IonItem>
    );
  }

  if (!has_access) {
    return (
      <IonItem lines="none" className="ion-padding">
        <IonLabel>
          <Body color="medium">You do not have permission to edit any group reports.</Body>
        </IonLabel>
      </IonItem>
    );
  }

  const group_filtered = selected_group_id
    ? publishers.filter((p) => p.group_id === selected_group_id)
    : publishers;

  const visible_publishers = show_missing_only
    ? group_filtered.filter((p) => !reported_publisher_ids.has(p.id))
    : group_filtered;

  const group_options = [
    { label: "All groups", value: "" },
    ...groups.map((g) => ({ label: g.name, value: g.id ?? "" })),
  ];

  return (
    <IonList>
      {has_secretary && (
        <Select
          label="Group"
          value={selected_group_id}
          options={group_options}
          placeholder="All groups"
          on_change={(value) => set_selected_group_id((value as string) || null)}
          interface_type="popover"
        />
      )}
      <ToggleInput
        label="Missing only"
        checked={show_missing_only}
        on_change={set_show_missing_only}
      />
      <IonItem lines="none">
        <IonLabel color="medium">
          <Body size="sm" color="medium">
            {`${visible_publishers.length} publisher${visible_publishers.length === 1 ? "" : "s"}`}
          </Body>
        </IonLabel>
      </IonItem>
      {visible_publishers.map((publisher) => (
        <PublisherReportItem key={publisher.id} publisher={publisher} date={report_date} />
      ))}
    </IonList>
  );
}
