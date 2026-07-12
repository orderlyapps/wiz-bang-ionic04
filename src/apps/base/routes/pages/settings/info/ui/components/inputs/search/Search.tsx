import { SearchContent } from "@base-content/pages/settings/info/ui/components/inputs/search/search-content/SearchContent";
import { SearchHeader } from "@base-content/pages/settings/info/ui/components/inputs/search/search-header/SearchHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function SearchPage() {
  return (
    <IonPage>
      <IonHeader>
        <SearchHeader />
      </IonHeader>
      <IonContent>
        <SearchContent />
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;
