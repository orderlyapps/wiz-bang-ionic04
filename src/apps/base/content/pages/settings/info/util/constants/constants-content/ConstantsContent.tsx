import { IonList, IonItem, IonLabel } from "@ionic/react";
import { localStorageKeys, localStorageKeyWithVariant } from "@util/constants/localStorageKeys";

export function ConstantsContent() {
  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <h2>localStorageKeys</h2>
          <p>Object containing all local storage key strings used in the app.</p>
        </IonLabel>
      </IonItem>
      {(Object.entries(localStorageKeys) as [keyof typeof localStorageKeys, string][]).map(
        ([key, value]) => (
          <IonItem key={key}>
            <IonLabel>{key}</IonLabel>
            <IonLabel slot="end">{value}</IonLabel>
          </IonItem>
        ),
      )}
      <IonItem>
        <IonLabel>
          <h2>localStorageKeyWithVariant</h2>
          <p>
            Returns a namespaced key string in the format <code>{"<key>:<variant>"}</code>.
          </p>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Example</IonLabel>
        <IonLabel slot="end">{localStorageKeyWithVariant("themeMode", "user-1")}</IonLabel>
      </IonItem>
    </IonList>
  );
}
