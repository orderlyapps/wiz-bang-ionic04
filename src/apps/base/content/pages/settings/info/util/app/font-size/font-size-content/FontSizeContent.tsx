import { useFontSize } from "@util/app/font-size/hooks/use-font-size";
import { FontSizeSelector } from "@util/app/font-size/font-size-selector/FontSizeSelector";
import { IonList } from "@ionic/react";

export function FontSizeContent() {
  const { font_size, setFontSize } = useFontSize();

  return (
    <IonList>
      <FontSizeSelector value={font_size} onChange={setFontSize} />
    </IonList>
  );
}
