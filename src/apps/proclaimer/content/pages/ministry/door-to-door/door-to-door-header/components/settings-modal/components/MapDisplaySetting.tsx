import { IonList } from "@ionic/react";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { useMapDisplayMode } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapDisplayModeContext";

export function MapDisplaySetting() {
  const { displayMode, updateDisplayMode } = useMapDisplayMode();

  return (
    <IonList>
      <ToggleInput
        label="Show Selected Map Only"
        checked={displayMode === "selected"}
        on_change={(checked) => updateDisplayMode(checked ? "selected" : "all")}
      />
    </IonList>
  );
}
