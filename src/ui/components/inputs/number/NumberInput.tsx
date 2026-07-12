import type { BaseInputProps } from "@ui/components/inputs/base/BaseInput";
import { BaseInput } from "@ui/components/inputs/base/BaseInput";

export type NumberInputProps = Omit<BaseInputProps, "type">;

export function NumberInput(props: NumberInputProps) {
  return <BaseInput type="number" {...props} />;
}
