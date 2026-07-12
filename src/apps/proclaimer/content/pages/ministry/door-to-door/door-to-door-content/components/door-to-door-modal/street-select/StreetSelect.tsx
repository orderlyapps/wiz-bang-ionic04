import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { StreetSelectModal } from "./street-select-modal/StreetSelectModal";
import type { Street } from "@shared/database/schemas/street";
import type { Suburb } from "@shared/database/schemas/suburb";

interface StreetSelectProps {
  label: string;
  value?: Street;
  placeholder?: string;
  disabled?: boolean;
  suburbId?: string;
  suburb?: Suburb;
  onSelect: (street: Street) => void;
}

export function StreetSelect({
  label,
  value,
  placeholder,
  disabled = false,
  suburbId,
  suburb,
  onSelect,
}: StreetSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const handleSelect = (street: Street) => {
    onSelect(street);
  };

  const handleDismiss = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalSelect
        label={label}
        display_value={value?.name || ""}
        placeholder={placeholder}
        disabled={disabled}
        on_open={handleOpen}
      />
      <StreetSelectModal
        isOpen={isModalOpen}
        onDidDismiss={handleDismiss}
        onSelect={handleSelect}
        suburbId={suburbId}
        suburb={suburb}
      />
    </>
  );
}
