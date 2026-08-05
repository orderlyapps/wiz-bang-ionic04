import { useRef } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react";
import { play, pause } from "ionicons/icons";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { useWatchtowerSettings } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerSettings";
import { useWatchtowerTimer } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerTimer";
import { SettingsModal } from "@proclaimer-content/pages/home/watchtower/watchtower-content/components/settings-modal/SettingsModal";

function getSectionLabel(
  type: "intro" | "numbered" | "review" | "summary",
  number: number | null,
  merged_count: number,
): string {
  switch (type) {
    case "intro":
      return "Intro";
    case "numbered":
      return merged_count > 0
        ? `Paragraph ${number}-${(number ?? 0) + merged_count}`
        : `Paragraph ${number}`;
    case "review":
      return `Review ${number}`;
    case "summary":
      return "Summary";
  }
}

function formatCountdown(seconds: number): string {
  const abs = Math.abs(Math.floor(seconds));
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const sign = seconds < 0 ? "-" : "";
  return `${sign}${m}:${s.toString().padStart(2, "0")}`;
}

interface WatchtowerContentProps {
  show_settings: boolean;
  on_dismiss_settings: () => void;
}

export function WatchtowerContent({ show_settings, on_dismiss_settings }: WatchtowerContentProps) {
  const settings = useWatchtowerSettings();
  const timer = useWatchtowerTimer({
    sections: settings.sections,
    end_time: settings.end_time,
  });

  const current = timer.current_section;
  const is_overtime = timer.section_remaining_seconds < 0;

  const frozen_section_ref = useRef(timer.current_section_index);
  const frozen_difference_ref = useRef(timer.time_difference);
  if (timer.current_section_index !== frozen_section_ref.current) {
    frozen_section_ref.current = timer.current_section_index;
    frozen_difference_ref.current = timer.time_difference;
  }
  const is_section_finished = timer.section_remaining_seconds <= 0;
  const time_difference = is_section_finished
    ? timer.time_difference
    : frozen_difference_ref.current;

  return (
    <>
      <SettingsModal
        is_open={show_settings}
        on_dismiss={on_dismiss_settings}
        sections={settings.sections}
        end_time={settings.end_time}
        on_update_duration={settings.update_section_duration}
        on_add_after={settings.add_section_after}
        on_delete={settings.delete_section}
        on_merge_next={settings.merge_with_next}
        on_unmerge={settings.unmerge_section}
        on_set_end_time={settings.set_end_time}
        on_reset={settings.reset_to_defaults}
      />

      <div className="ion-padding ion-text-center">
        {current ? (
          <div className="flex-center ion-padding ">
            <IonText style={{ fontSize: "40px" }}>
              {getSectionLabel(current.type, current.number, current.merged_count)}
            </IonText>
          </div>
        ) : (
          <Heading size="lg">Watchtower Timer</Heading>
        )}

        <div className="flex-center">
          <IonText style={{ fontSize: "120px" }} color={is_overtime ? "danger" : "primary"}>
            {formatCountdown(timer.section_remaining_seconds)}
          </IonText>
        </div>

        <div style={{ marginBlock: "80px" }}>
          {timer.is_playing && (
            <IonButton
              // fill="outline"
              size="large"
              disabled={timer.current_section_index <= 0}
              onClick={timer.prev_section}
            >
              <IonText
                style={{
                  fontSize: "30px",
                }}
              >
                Prev
              </IonText>
            </IonButton>
          )}

          {!timer.is_playing ? (
            <IonButton size="large" shape="round" onClick={timer.play} className="ion-margin">
              <IonIcon slot="icon-only" icon={play} />
            </IonButton>
          ) : (
            <IonButton
              size="large"
              shape="round"
              color="warning"
              onClick={timer.pause}
              className="ion-margin"
            >
              <IonIcon slot="icon-only" icon={pause} />
            </IonButton>
          )}

          {timer.is_playing && (
            <IonButton
              // fill="outline"
              size="large"
              disabled={timer.current_section_index >= settings.sections.length - 1}
              onClick={timer.next_section}
            >
              <IonText
                style={{
                  fontSize: "30px",
                }}
              >
                Next
              </IonText>
            </IonButton>
          )}
        </div>

        <IonGrid style={{ margin: "40px 0" }}>
          <IonRow>
            <IonCol>
              <IonText style={{ fontSize: "40px" }}>
                {formatCountdown(timer.overall_remaining_seconds)}
              </IonText>
            </IonCol>
            <IonCol>
              <IonText
                style={{ fontSize: "40px" }}
                color={time_difference >= 0 ? "success" : "danger"}
              >
                {time_difference >= 0 ? "+" : ""}
                {formatCountdown(time_difference)}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton fill="clear" color="medium" onClick={timer.reset}>
          <IonText style={{ fontSize: "30px" }}>Reset</IonText>
        </IonButton>
      </div>
    </>
  );
}
