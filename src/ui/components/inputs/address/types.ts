export type AddressValue = {
  suburb: { id: string; name: string; bbox?: number[] };
  street?: { id: string; name: string };
  house_number?: string;
  unit_number?: string;
  coordinates?: number[];
};

export type SuburbRef = {
  id: string;
  name: string;
  bbox?: number[];
};

export type AddressInputProps = {
  label: string;
  value?: AddressValue;
  placeholder?: string;
  disabled?: boolean;
  on_change: (value: AddressValue) => void;
};
