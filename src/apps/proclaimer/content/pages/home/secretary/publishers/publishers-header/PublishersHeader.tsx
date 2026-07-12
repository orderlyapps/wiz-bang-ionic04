import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface PublishersHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  on_add: () => void;
}

export function PublishersHeader({ searchTerm, onSearch, on_add }: PublishersHeaderProps) {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/secretary" />
        </IonButtons>
        <IonTitle>Publishers</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={on_add} />
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <SearchInput value={searchTerm} on_change={onSearch} />
      </IonToolbar>
    </>
  );
}
