import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { useLocation } from "react-router-dom";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { usePresets } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/hooks/use-presets/usePresets";
import { filterPublishers } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/hooks/use-publisher-filter/usePublisherFilter";
import { FilterSelectModal } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/components/filter-modal/FilterSelectModal";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

export function AllPublishersContent({ searchTerm }: { searchTerm: string }) {
  const { has_elder, has_congregation_admin, is_super_admin } = usePermissions();
  const can_view_details = has_elder || has_congregation_admin || is_super_admin;
  const [is_filter_modal_open, set_is_filter_modal_open] = useState(false);

  const {
    presets,
    active_preset,
    is_default_active,
    selectPreset,
    createPreset,
    renamePreset,
    deletePreset,
    updatePreset,
  } = usePresets();
  const location = useLocation();
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  if (isLoading) {
    return <Spinner />;
  }

  const publishers = filterPublishers(
    (data ?? []).filter((p) => p.congregation_id === congregation_id),
    active_preset.filter,
  ).filter((p) => getPublisherDisplayName(p).toLowerCase().includes(searchTerm.toLowerCase()));

  const detail_path = location.pathname.startsWith("/home")
    ? "/home/secretary/publishers"
    : "/publishers/all";

  return (
    <>
      <TextButton
        label="Filter"
        fill="outline"
        expand="block"
        on_click={() => set_is_filter_modal_open(true)}
      />

      <IonItem lines="none">
        <IonLabel>
          <Heading>{active_preset.name}</Heading>
        </IonLabel>
        <div slot="end">
          <Body color="medium">{publishers.length}</Body>
        </div>
      </IonItem>

      {publishers.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">
            {searchTerm ? `No publishers matching "${searchTerm}"` : "No publishers found."}
          </Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={publishers}
            get_id={(p) => p.id ?? ""}
            gap="sm"
            render_item={(p) => (
              <IonItem
                button={can_view_details}
                routerLink={can_view_details ? `${detail_path}/${p.id}` : undefined}
              >
                {getPublisherDisplayName(p)}
              </IonItem>
            )}
          />
        </IonList>
      )}
      <FilterSelectModal
        is_open={is_filter_modal_open}
        presets={presets}
        active_preset={active_preset}
        is_default_active={is_default_active}
        on_select_preset={selectPreset}
        on_create_preset={createPreset}
        on_rename_preset={renamePreset}
        on_delete_preset={deletePreset}
        on_change={(filter) => {
          updatePreset(filter);
        }}
        on_dismiss={() => set_is_filter_modal_open(false)}
      />
    </>
  );
}
