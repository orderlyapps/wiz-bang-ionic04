import type { BaseInputProps } from "@ui/components/inputs/base/BaseInput";
import { BaseInput } from "@ui/components/inputs/base/BaseInput";

export type PasswordInputProps = Omit<BaseInputProps, "type" | "max_length">;

export function PasswordInput(props: PasswordInputProps) {
  return <BaseInput type="password" {...props} />;
}
