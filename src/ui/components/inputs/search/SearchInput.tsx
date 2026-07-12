import { IonSearchbar } from "@ionic/react";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  on_change: (value: string) => void;
}

export function SearchInput({ value, placeholder = "Search...", on_change }: SearchInputProps) {
  return (
    <IonSearchbar
      value={value}
      placeholder={placeholder}
      onIonInput={(e) => on_change(e.detail.value ?? "")}
      debounce={0}
      style={{ maxWidth: 480, marginInline: "auto" }}
    />
  );
}
