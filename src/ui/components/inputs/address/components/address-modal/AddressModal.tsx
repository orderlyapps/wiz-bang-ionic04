import { useRef, useState } from "react";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { SuburbPicker } from "./components/suburb-picker/SuburbPicker";
import { StreetPicker } from "./components/street-picker/StreetPicker";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { geocodeAddress } from "@util/vendor/mapbox/helper/geocodeAddress";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";
import type { AddressValue, SuburbRef } from "../../types";

type AddressModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  value?: AddressValue;
  on_change: (value: AddressValue) => void;
};

export function AddressModal({ isOpen, onDidDismiss, value, on_change }: AddressModalProps) {
  const [suburb, setSuburb] = useState<SuburbRef | undefined>(undefined);
  const [street, setStreet] = useState<{ id: string; name: string } | undefined>(undefined);
  const [houseNumber, setHouseNumber] = useState<string | undefined>(undefined);
  const [unitNumber, setUnitNumber] = useState<string | undefined>(undefined);
  const geocodeReqId = useRef(0);

  async function tryGeocode(
    suburbRef: SuburbRef,
    streetRef: { id: string; name: string },
    houseNum: string,
  ) {
    if (!suburbRef.bbox || suburbRef.bbox.length !== 4) return;
    const reqId = ++geocodeReqId.current;
    const feature = await geocodeAddress(
      { address_number: houseNum, street: streetRef.name, place: suburbRef.name },
      { bbox: suburbRef.bbox as [number, number, number, number] },
    );
    if (reqId !== geocodeReqId.current) return;
    if (feature) {
      on_change({
        suburb: { id: suburbRef.id, name: suburbRef.name, bbox: suburbRef.bbox },
        street: streetRef,
        house_number: houseNum,
        unit_number: unitNumber ?? value?.unit_number,
        coordinates: [...feature.geometry.coordinates],
      });
    }
  }

  function handleSuburbSelect(selected: Suburb) {
    const ref: SuburbRef = { id: selected.id!, name: selected.name, bbox: selected.bbox };
    setSuburb(ref);
    setStreet(undefined);
    on_change({
      suburb: { id: ref.id, name: ref.name, bbox: ref.bbox },
      house_number: houseNumber ?? value?.house_number,
      unit_number: unitNumber ?? value?.unit_number,
    });
  }

  function handleStreetSelect(selected: Street) {
    const streetRef = { id: selected.id!, name: selected.name };
    setStreet(streetRef);
    const currentSuburb = suburb ?? value?.suburb;
    if (!currentSuburb) return;
    on_change({
      suburb: {
        id: currentSuburb.id,
        name: currentSuburb.name,
        bbox: suburb?.bbox ?? value?.suburb.bbox,
      },
      street: streetRef,
      house_number: houseNumber ?? value?.house_number,
      unit_number: unitNumber ?? value?.unit_number,
    });
  }

  function handleDismiss() {
    setSuburb(undefined);
    setStreet(undefined);
    setHouseNumber(undefined);
    setUnitNumber(undefined);
    onDidDismiss();
  }

  async function handleDone() {
    const currentSuburb = suburb ?? value?.suburb;
    const currentStreet = street ?? value?.street;
    const houseNum = houseNumber ?? value?.house_number;
    if (currentSuburb && currentStreet && houseNum) {
      const suburbRef: SuburbRef = {
        id: currentSuburb.id,
        name: currentSuburb.name,
        bbox: suburb?.bbox ?? value?.suburb.bbox,
      };
      await tryGeocode(suburbRef, currentStreet, houseNum);
    }
    handleDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Address</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDone}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SuburbPicker value={suburb ?? value?.suburb} onSelect={handleSuburbSelect} />
        <StreetPicker
          value={street ?? value?.street}
          suburbId={suburb?.id ?? value?.suburb.id}
          suburb={suburb ?? (value ? { id: value.suburb.id, name: value.suburb.name } : undefined)}
          disabled={!suburb && !value?.suburb}
          onSelect={handleStreetSelect}
        />
        <TextInput
          label="House Number"
          value={houseNumber ?? value?.house_number ?? ""}
          placeholder="e.g. 42"
          on_change={(v) => {
            setHouseNumber(v);
            const currentSuburb = suburb ?? value?.suburb;
            if (currentSuburb) {
              on_change({
                suburb: {
                  id: currentSuburb.id,
                  name: currentSuburb.name,
                  bbox: suburb?.bbox ?? value?.suburb.bbox,
                },
                street: street ?? value?.street,
                house_number: v,
                unit_number: unitNumber ?? value?.unit_number,
              });
            }
          }}
        />
        <TextInput
          label="Unit Number (optional)"
          value={unitNumber ?? value?.unit_number ?? ""}
          placeholder="e.g. 3"
          on_change={(v) => {
            setUnitNumber(v);
            const currentSuburb = suburb ?? value?.suburb;
            if (currentSuburb) {
              on_change({
                suburb: {
                  id: currentSuburb.id,
                  name: currentSuburb.name,
                  bbox: suburb?.bbox ?? value?.suburb.bbox,
                },
                street: street ?? value?.street,
                house_number: houseNumber ?? value?.house_number,
                unit_number: v,
              });
            }
          }}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
