import { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addOutline, mapOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import type { Address } from "@shared/database/rxdb/collections/publisher";
import { suburbCollection } from "@shared/database/collections/suburb";
import { streetCollection } from "@shared/database/collections/street";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import type { AddressValue } from "@ui/components/inputs/address/types";
import { MapShareActionSheet } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/map-share-action-sheet/MapShareActionSheet";
import { AddressAddModal } from "./components/address-add-modal/AddressAddModal";

type AddressEntry = NonNullable<Address>[number];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface Props {
  publisher_id: string;
  address: NonNullable<Address>;
  read_only?: boolean;
}

export function AddressList({ publisher_id, address, read_only = false }: Props) {
  const { data: suburbs } = useLiveQuery((q) => q.from({ s: suburbCollection }));
  const { data: streets } = useLiveQuery((q) => q.from({ st: streetCollection }));
  const [share_coords, set_share_coords] = useState<{ lat: number; lng: number } | null>(null);
  const [editing_entry, set_editing_entry] = useState<AddressEntry | null>(null);
  const [editing_address_value, set_editing_address_value] = useState<AddressValue | undefined>(
    undefined,
  );
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_add() {
    set_editing_entry(null);
    set_editing_address_value(undefined);
    set_is_modal_open(true);
  }

  function open_edit(entry: AddressEntry) {
    set_editing_entry(entry);
    set_editing_address_value(toAddressValue(entry));
    set_is_modal_open(true);
  }

  function close_modal() {
    set_is_modal_open(false);
    set_editing_entry(null);
  }

  function resolveName(
    value: string | undefined,
    lookup: { id?: string; name: string }[],
  ): { id: string; name: string } | undefined {
    if (!value) return undefined;
    if (UUID_RE.test(value)) {
      const found = lookup.find((s) => s.id === value);
      return found ? { id: found.id!, name: found.name } : { id: value, name: value };
    }
    return { id: value, name: value };
  }

  function toAddressValue(entry: (typeof address)[number]): AddressValue | undefined {
    const suburb = resolveName(entry.suburb, suburbs ?? []);
    if (!suburb) return undefined;
    const suburbRecord = suburbs?.find((s) => s.id === suburb.id);
    const street = resolveName(entry.street, streets ?? []);
    return {
      suburb: { id: suburb.id, name: suburb.name, bbox: suburbRecord?.bbox },
      street,
      house_number: entry.house_number,
      unit_number: entry.unit_number,
      coordinates: entry.coordinates,
    };
  }

  function formatDisplayValue(entry: (typeof address)[number]): string {
    const street = resolveName(entry.street, streets ?? []);
    const suburb = resolveName(entry.suburb, suburbs ?? []);
    const numberPart =
      entry.unit_number && entry.house_number
        ? `${entry.unit_number}/${entry.house_number}`
        : entry.unit_number || entry.house_number;
    const parts = [numberPart, street?.name, suburb?.name].filter(Boolean);
    return parts.join(" ") || "-";
  }

  return (
    <>
      {!read_only && (
        <>
          <Space />
          <IonItem>
            <IonLabel>
              <Heading size="sm">Addresses</Heading>
            </IonLabel>
            <IonButton
              fill="clear"
              size="small"
              slot="end"
              onClick={open_add}
              aria-label="Add address"
            >
              <IonIcon icon={addOutline} color="primary" />
            </IonButton>
          </IonItem>
        </>
      )}
      {address.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label + " Address"}
            value={formatDisplayValue(entry)}
            end_detail={
              entry.coordinates && entry.coordinates.length >= 2 ? (
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`Share ${entry.label}`}
                  onClick={() =>
                    set_share_coords({
                      lat: entry.coordinates![1],
                      lng: entry.coordinates![0],
                    })
                  }
                >
                  <IonIcon slot="icon-only" icon={mapOutline} />
                </IonButton>
              ) : undefined
            }
          />
        ) : (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={formatDisplayValue(entry)}
            on_click={() => open_edit(entry)}
          />
        ),
      )}
      {address.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No addresses</IonLabel>
        </IonItem>
      )}
      <MapShareActionSheet
        lat={share_coords?.lat ?? 0}
        lng={share_coords?.lng ?? 0}
        is_open={share_coords !== null}
        on_dismiss={() => set_share_coords(null)}
      />
      {!read_only && (
        <AddressAddModal
          is_open={is_modal_open}
          on_dismiss={close_modal}
          publisher_id={publisher_id}
          entry={editing_entry}
          address_value={editing_address_value}
        />
      )}
    </>
  );
}
