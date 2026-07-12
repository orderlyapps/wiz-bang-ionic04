import { IonList } from "@ionic/react";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { useQuickLinks } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useQuickLinksContext";

export function QuickLinksSetting() {
  const { fabVisible, updateFabVisible } = useQuickLinks();

  return (
    <IonList>
      <ToggleInput
        label="Show Instruction Links"
        checked={fabVisible}
        on_change={updateFabVisible}
      />
    </IonList>
  );
}
