import { IonButton, IonIcon, IonText } from "@ionic/react";
import { play, pause } from "ionicons/icons";

interface TimerControlsProps {
  is_playing: boolean;
  current_section_index: number;
  section_count: number;
  on_play: () => void;
  on_pause: () => void;
  on_prev: () => void;
  on_next: () => void;
  on_reset: () => void;
}

export function TimerControls({
  is_playing,
  current_section_index,
  section_count,
  on_play,
  on_pause,
  on_prev,
  on_next,
  on_reset,
}: TimerControlsProps) {
  return (
    <>
      <div style={{ marginBlock: "80px" }} className="ion-text-center">
        {is_playing && (
          <IonButton size="large" disabled={current_section_index <= 0} onClick={on_prev}>
            <IonText style={{ fontSize: "30px" }}>Prev</IonText>
          </IonButton>
        )}

        {!is_playing ? (
          <IonButton size="large" shape="round" onClick={on_play} className="ion-margin">
            <IonIcon slot="icon-only" icon={play} />
          </IonButton>
        ) : (
          <IonButton
            size="large"
            shape="round"
            color="warning"
            onClick={on_pause}
            className="ion-margin"
          >
            <IonIcon slot="icon-only" icon={pause} />
          </IonButton>
        )}

        {is_playing && (
          <IonButton
            size="large"
            disabled={current_section_index >= section_count - 1}
            onClick={on_next}
          >
            <IonText style={{ fontSize: "30px" }}>Next</IonText>
          </IonButton>
        )}
      </div>

      <div className="ion-text-center">
        <IonButton fill="clear" color="medium" onClick={on_reset}>
          <IonText style={{ fontSize: "30px" }}>Reset</IonText>
        </IonButton>
      </div>
    </>
  );
}
