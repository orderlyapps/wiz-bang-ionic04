import {
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { NetworkToast } from "@util/app/network";

export function NetworkContent() {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>NetworkToast Component</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            The <code>NetworkToast</code> component displays an IonToast notification when the app's
            network status changes between online and offline.
          </p>
        </IonCardContent>
      </IonCard>

      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Usage</h3>
            <p>Import and place the component in your app root:</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <code>
              {`import { NetworkToast } from "@util/app/network";`}
              <br />
              <br />
              {`<NetworkToast />`}
            </code>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h3>Props</h3>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>online_message</IonLabel>
          <IonNote slot="end">string (optional)</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>offline_message</IonLabel>
          <IonNote slot="end">string (optional)</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>duration</IonLabel>
          <IonNote slot="end">number (ms, optional)</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h3>Example with custom messages</h3>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <code>
              {`<NetworkToast`}
              <br />
              {`  online_message="Connected!"`}
              <br />
              {`  offline_message="No internet connection"`}
              <br />
              {`  duration={5000}`}
              <br />
              {`/>`}
            </code>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h3>useNetworkStatus Hook</h3>
            <p>For custom implementations, use the hook directly:</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <code>
              {`import { useNetworkStatus } from "@util/app/network";`}
              <br />
              <br />
              {`function MyComponent() {`}
              <br />
              {`  const { is_online } = useNetworkStatus();`}
              <br />
              {`  return <div>{is_online ? "Online" : "Offline"}</div>;`}
              <br />
              {`}`}
            </code>
          </IonLabel>
        </IonItem>
      </IonList>

      <NetworkToast />
    </>
  );
}
