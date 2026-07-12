import type { BaseInputProps } from "@ui/components/inputs/base/BaseInput";
import { BaseInput } from "@ui/components/inputs/base/BaseInput";

export type EmailInputProps = Omit<BaseInputProps, "type" | "max_length">;

export function EmailInput(props: EmailInputProps) {
  return <BaseInput type="email" {...props} />;
}
