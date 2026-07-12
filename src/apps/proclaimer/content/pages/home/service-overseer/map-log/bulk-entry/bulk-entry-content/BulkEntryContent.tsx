import { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { BulkCheckout } from "./components/bulk-checkout/BulkCheckout";
import { CsvImport } from "./components/csv-import/CsvImport";

export function BulkEntryContent() {
  const [mode, set_mode] = useState<"manual" | "csv">("manual");

  return (
    <>
      <IonSegment value={mode} onIonChange={(e) => set_mode(e.detail.value as "manual" | "csv")}>
        <IonSegmentButton value="manual">
          <IonLabel>Manual Entry</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="csv">
          <IonLabel>CSV Import</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {mode === "manual" ? <BulkCheckout /> : <CsvImport />}
    </>
  );
}
