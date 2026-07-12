import { useNotAtHomeClickHandler } from "../../hooks/useNotAtHomeClickHandler";
import type { NotAtHome } from "../../types";

type NotAtHomeClickHandlerProps = {
  onSelect: (notAtHome: NotAtHome) => void;
  onSelectUnits: (groupKey: string) => void;
};

export function NotAtHomeClickHandler({ onSelect, onSelectUnits }: NotAtHomeClickHandlerProps) {
  useNotAtHomeClickHandler({ onSelect, onSelectUnits });
  return null;
}
