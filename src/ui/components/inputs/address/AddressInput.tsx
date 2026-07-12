import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { AddressModal } from "./components/address-modal/AddressModal";
import type { AddressInputProps, AddressValue } from "./types";

export function AddressInput({
  label,
  value,
  placeholder,
  disabled = false,
  on_change,
}: AddressInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayValue = value
    ? [
        value.unit_number && value.house_number
          ? `${value.unit_number}/${value.house_number}`
          : value.unit_number || value.house_number,
        value.street?.name ? `${value.street.name},` : null,
        value.suburb.name,
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  function handleChange(newValue: AddressValue) {
    on_change(newValue);
  }

  return (
    <>
      <ModalSelect
        label={label}
        display_value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        on_open={() => setIsModalOpen(true)}
      />
      <AddressModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        value={value}
        on_change={handleChange}
      />
    </>
  );
}
