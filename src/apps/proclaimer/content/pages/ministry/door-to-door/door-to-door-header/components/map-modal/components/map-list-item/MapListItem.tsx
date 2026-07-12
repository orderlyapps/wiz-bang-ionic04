import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListItemProps {
  map: MapWithBoundary;
  onMapSelect: (map: MapWithBoundary) => void;
  onPreviewImage: (url: string) => void;
  label_color?: IonicColor;
  value_2?: string;
}

export function MapListItem({
  map,
  onMapSelect,
  onPreviewImage,
  label_color,
  value_2,
}: MapListItemProps) {
  return (
    <LabelValueItem
      key={map.id}
      label={map.name}
      value={map.details ?? undefined}
      value_2={value_2}
      on_click={() => onMapSelect(map)}
      end_detail={
        map.url ? (
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={(e) => {
                e.stopPropagation();
                onPreviewImage(map.url!);
              }}
            >
              <IonIcon slot="icon-only" icon={imageOutline} size="large" color={label_color} />
            </IonButton>
          </IonButtons>
        ) : undefined
      }
    />
  );
}
