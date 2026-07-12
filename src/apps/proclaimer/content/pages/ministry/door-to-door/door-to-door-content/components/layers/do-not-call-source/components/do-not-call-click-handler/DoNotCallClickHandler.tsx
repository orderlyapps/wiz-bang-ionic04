import { useDoNotCallClickHandler } from "../../hooks/useDoNotCallClickHandler";
import type { DoNotCall } from "../../types";

type DoNotCallClickHandlerProps = {
  onSelect: (doNotCall: DoNotCall) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function DoNotCallClickHandler({ onSelect, onSelectGroup }: DoNotCallClickHandlerProps) {
  useDoNotCallClickHandler({ onSelect, onSelectGroup });
  return null;
}
