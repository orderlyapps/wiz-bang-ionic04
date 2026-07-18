import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { BulkEntryIconButton } from "@ui/components/inputs/button/icon/bulk-entry/BulkEntryIconButton";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";

interface MapLogHeaderProps {
  search_term: string;
  on_search: (value: string) => void;
}

export function MapLogHeader({ search_term, on_search }: MapLogHeaderProps) {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/service-overseer" />
        </IonButtons>
        <IonTitle>Map Log</IonTitle>
        <IonButtons slot="end">
          <BulkEntryIconButton routerLink="/home/service-overseer/map-log/bulk-entry" />
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <SearchInput value={search_term} on_change={on_search} placeholder="Search maps..." />
      </IonToolbar>
    </>
  );
}
