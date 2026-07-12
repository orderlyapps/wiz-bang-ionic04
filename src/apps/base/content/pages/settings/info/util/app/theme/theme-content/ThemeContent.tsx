import { useTheme } from "@util/app/theme/hooks/use-theme";
import { ThemeSelector } from "@util/app/theme/theme-selector/ThemeSelector";
import { IonList, IonItem, IonLabel } from "@ionic/react";

export function ThemeContent() {
  const { theme_mode, resolved_theme, setTheme } = useTheme();

  return (
    <IonList>
      <ThemeSelector value={theme_mode} onChange={setTheme} />
      <IonItem>
        <IonLabel>Active Theme</IonLabel>
        <IonLabel slot="end">{resolved_theme}</IonLabel>
      </IonItem>
    </IonList>
  );
}
