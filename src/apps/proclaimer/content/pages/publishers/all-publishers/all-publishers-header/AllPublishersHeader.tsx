import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";

interface AllPublishersHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export function AllPublishersHeader({ searchTerm, onSearch }: AllPublishersHeaderProps) {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/publishers" />
        </IonButtons>
        <IonTitle>Publishers</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <SearchInput value={searchTerm} on_change={onSearch} />
      </IonToolbar>
    </>
  );
}
