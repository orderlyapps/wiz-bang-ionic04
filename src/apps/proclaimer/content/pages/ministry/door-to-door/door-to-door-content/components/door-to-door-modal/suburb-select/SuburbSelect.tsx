import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { SuburbSelectModal } from "./suburb-select-modal/SuburbSelectModal";
import type { Suburb } from "@shared/database/schemas/suburb";

interface SuburbSelectProps {
  label: string;
  value?: Suburb;
  placeholder?: string;
  disabled?: boolean;
  onSelect: (suburb: Suburb) => void;
}

export function SuburbSelect({
  label,
  value,
  placeholder,
  disabled = false,
  onSelect,
}: SuburbSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const handleSelect = (suburb: Suburb) => {
    onSelect(suburb);
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
      <SuburbSelectModal
        isOpen={isModalOpen}
        onDidDismiss={handleDismiss}
        onSelect={handleSelect}
      />
    </>
  );
}
