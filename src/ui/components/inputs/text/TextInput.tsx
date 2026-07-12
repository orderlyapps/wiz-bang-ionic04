import type { BaseInputProps } from "@ui/components/inputs/base/BaseInput";
import { BaseInput } from "@ui/components/inputs/base/BaseInput";

export type TextInputProps = Omit<BaseInputProps, "type">;

export function TextInput(props: TextInputProps) {
  return <BaseInput type="text" {...props} />;
}
