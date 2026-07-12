import { useRef } from "react";
import { IonActionSheet, IonAlert } from "@ionic/react";
import { addOutline, documentAttachOutline } from "ionicons/icons";
import { mapCollection } from "@shared/database/collections/map";
import { recordRecentMap } from "../../../../utils/useRecentMaps";
import { kmlToGeoJSON } from "../../../../utils/kml-to-geojson";
import type { SelectedMap } from "../../../../utils/types";

type MapListModalAlertsProps = {
  show_add_alert: boolean;
  set_show_add_alert: (show: boolean) => void;
  show_add_action_sheet: boolean;
  set_show_add_action_sheet: (show: boolean) => void;
  show_error_alert: boolean;
  set_show_error_alert: (show: boolean) => void;
  congregation_id?: string;
  on_select: (selection: SelectedMap) => void;
  on_did_dismiss: () => void;
  on_import_kml: (geojson: GeoJSON.FeatureCollection) => void;
};

export function MapListModalAlerts({
  show_add_alert,
  set_show_add_alert,
  show_add_action_sheet,
  set_show_add_action_sheet,
  show_error_alert,
  set_show_error_alert,
  congregation_id,
  on_select,
  on_did_dismiss,
  on_import_kml,
}: MapListModalAlertsProps) {
  const file_input_ref = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const geojson = kmlToGeoJSON(text);
        if (geojson.features.length === 0) {
          set_show_error_alert(true);
          return;
        }
        on_import_kml(geojson);
        on_did_dismiss();
      } catch {
        set_show_error_alert(true);
      }
    };
    reader.onerror = () => {
      set_show_error_alert(true);
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <>
      <IonAlert
        isOpen={show_add_alert}
        header="New Map"
        inputs={[{ name: "name", type: "text", placeholder: "Map name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Create",
            handler: (data: { name: string }) => {
              const name = data.name.trim();
              if (!name || !congregation_id) return;
              const id = crypto.randomUUID();
              mapCollection.insert({
                id,
                congregation_id,
                name,
                boundary: null,
                blocks: null,
              });
              recordRecentMap(id);
              on_select({
                type: "map",
                id,
                name,
                details: null,
                url: null,
                boundary: null,
                blocks: null,
              });
              on_did_dismiss();
            },
          },
        ]}
        onDidDismiss={() => set_show_add_alert(false)}
      />
      <IonActionSheet
        isOpen={show_add_action_sheet}
        onDidDismiss={() => set_show_add_action_sheet(false)}
        buttons={[
          {
            text: "Add Map",
            icon: addOutline,
            handler: () => set_show_add_alert(true),
          },
          {
            text: "Import KML File",
            icon: documentAttachOutline,
            handler: () => file_input_ref.current?.click(),
          },
          { text: "Cancel", role: "cancel" },
        ]}
      />
      <input
        ref={file_input_ref}
        type="file"
        accept=".kml"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IonAlert
        isOpen={show_error_alert}
        header="Import Failed"
        message="Could not import the KML file. Please ensure it is a valid KML file with at least one placemark."
        buttons={["OK"]}
        onDidDismiss={() => set_show_error_alert(false)}
      />
    </>
  );
}
