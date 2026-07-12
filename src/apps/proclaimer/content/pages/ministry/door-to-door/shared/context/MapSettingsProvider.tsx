import { type ReactNode } from "react";
import { SelectedMapProvider } from "./SelectedMapContext";
import { MapDisplayModeProvider } from "./MapDisplayModeContext";
import { MapStyleProvider } from "./MapStyleContext";
import { QuickLinksProvider } from "./QuickLinksContext";

export function MapSettingsProvider({ children }: { children: ReactNode }) {
  return (
    <SelectedMapProvider>
      <MapDisplayModeProvider>
        <MapStyleProvider>
          <QuickLinksProvider>{children}</QuickLinksProvider>
        </MapStyleProvider>
      </MapDisplayModeProvider>
    </SelectedMapProvider>
  );
}
