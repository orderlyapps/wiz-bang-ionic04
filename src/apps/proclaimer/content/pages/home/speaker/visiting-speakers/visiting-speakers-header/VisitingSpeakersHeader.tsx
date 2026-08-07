import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonSearchbar } from "@ionic/react";

type VisitingSpeakersHeaderProps = {
  search: string;
  on_search_change: (value: string) => void;
};

export function VisitingSpeakersHeader({ search, on_search_change }: VisitingSpeakersHeaderProps) {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Visiting Speakers</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar
          value={search}
          onIonInput={(e) => on_search_change(e.detail.value ?? "")}
          placeholder="Search name or congregation"
          debounce={0}
        />
      </IonToolbar>
    </>
  );
}
