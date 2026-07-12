import { useState } from "react";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

export type UseDoNotCallFormResult = {
  selectedSuburb: Suburb | undefined;
  selectedStreet: Street | undefined;
  houseNumber: string;
  unitNumber: string;
  notes: string;
  handleSuburbSelect: (suburb: Suburb) => void;
  handleStreetSelect: (street: Street) => void;
  handleHouseNumberChange: (value: string) => void;
  handleUnitNumberChange: (value: string) => void;
  handleNotesChange: (value: string) => void;
  resetAfterSave: () => void;
};

export function useDoNotCallForm(): UseDoNotCallFormResult {
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | undefined>();
  const [selectedStreet, setSelectedStreet] = useState<Street | undefined>();
  const [houseNumber, setHouseNumber] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [notes, setNotes] = useState("");

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

  function handleNotesChange(value: string) {
    setNotes(value);
  }

  function resetAfterSave() {
    if (!unitNumber) setHouseNumber("");
    setUnitNumber("");
    setNotes("");
  }

  return {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    notes,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleNotesChange,
    resetAfterSave,
  };
}
