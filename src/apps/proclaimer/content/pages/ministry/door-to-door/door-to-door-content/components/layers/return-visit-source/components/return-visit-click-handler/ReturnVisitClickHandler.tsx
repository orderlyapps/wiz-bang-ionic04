import { useReturnVisitClickHandler } from "../../hooks/useReturnVisitClickHandler";
import type { ReturnVisit } from "../../types";

type ReturnVisitClickHandlerProps = {
  onSelect: (returnVisit: ReturnVisit) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function ReturnVisitClickHandler({ onSelect, onSelectGroup }: ReturnVisitClickHandlerProps) {
  useReturnVisitClickHandler({ onSelect, onSelectGroup });
  return null;
}
