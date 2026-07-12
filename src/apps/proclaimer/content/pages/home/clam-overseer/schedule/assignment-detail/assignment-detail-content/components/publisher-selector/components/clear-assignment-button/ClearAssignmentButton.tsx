import { TextButton } from "@ui/components/inputs/button/text/TextButton";

interface ClearAssignmentButtonProps {
  on_click: () => void;
  disabled?: boolean;
  label?: string;
}

export function ClearAssignmentButton({
  on_click,
  disabled = false,
  label = "Clear Assignment",
}: ClearAssignmentButtonProps) {
  return <TextButton label={label} color="danger" on_click={on_click} disabled={disabled} />;
}
