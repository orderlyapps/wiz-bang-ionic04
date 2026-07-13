import { useEffect, useState } from "react";
import { loadDoorToDoorForm, saveDoorToDoorForm } from "./door-to-door-form-storage";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

function belongsToSuburb(street: Street, suburb?: Suburb): boolean {
  return !!suburb && street.suburb_id === suburb.id;
}

function getInitialState() {
  const stored = loadDoorToDoorForm();
  const suburb = stored?.suburb;
  const street =
    stored?.street && belongsToSuburb(stored.street, suburb) ? stored.street : undefined;
  return {
    suburb,
    street,
    house_number: street ? (stored?.house_number ?? "") : "",
    unit_number: street ? (stored?.unit_number ?? "") : "",
    visit_type: stored?.visit_type ?? "return",
  };
}

export type UseDoorToDoorFormResult = {
  selectedSuburb: Suburb | undefined;
  selectedStreet: Street | undefined;
  houseNumber: string;
  unitNumber: string;
  visitType: "letter" | "return" | "return_visit";
  handleSuburbSelect: (suburb: Suburb) => void;
  handleStreetSelect: (street: Street) => void;
  handleHouseNumberChange: (value: string) => void;
  handleUnitNumberChange: (value: string) => void;
  handleVisitTypeChange: (value: "letter" | "return" | "return_visit") => void;
  resetAfterSave: () => void;
};

export function useDoorToDoorForm(): UseDoorToDoorFormResult {
  const initialState = getInitialState();
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | undefined>(initialState.suburb);
  const [selectedStreet, setSelectedStreet] = useState<Street | undefined>(initialState.street);
  const [houseNumber, setHouseNumber] = useState(initialState.house_number);
  const [unitNumber, setUnitNumber] = useState(initialState.unit_number);
  const [visitType, setVisitType] = useState<"letter" | "return" | "return_visit">(
    initialState.visit_type,
  );

  useEffect(() => {
    saveDoorToDoorForm({
      suburb: selectedSuburb,
      street: selectedStreet,
      house_number: houseNumber,
      unit_number: unitNumber,
      visit_type: visitType,
    });
  }, [selectedSuburb, selectedStreet, houseNumber, unitNumber, visitType]);

  function handleSuburbSelect(suburb: Suburb) {
    setSelectedSuburb(suburb);
    setSelectedStreet(undefined);
    setHouseNumber("");
    setUnitNumber("");
  }

  function handleStreetSelect(street: Street) {
    setSelectedStreet(street);
    setHouseNumber("");
    setUnitNumber("");
  }

  function handleHouseNumberChange(value: string) {
    setHouseNumber(value);
    setUnitNumber("");
  }

  function handleUnitNumberChange(value: string) {
    setUnitNumber(value);
  }

  function handleVisitTypeChange(value: "letter" | "return" | "return_visit") {
    setVisitType(value);
  }

  function resetAfterSave() {
    if (!unitNumber) setHouseNumber("");
    setUnitNumber("");
    setVisitType("return");
  }

  return {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    visitType,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleVisitTypeChange,
    resetAfterSave,
  };
}
