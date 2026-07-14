import { IonButton, IonIcon, IonText } from "@ionic/react";
import { play, pause } from "ionicons/icons";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { useWatchtowerSettings } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerSettings";
import { useWatchtowerTimer } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerTimer";
import { SettingsModal } from "@proclaimer-content/pages/home/watchtower/watchtower-content/components/settings-modal/SettingsModal";
import { Space } from "@ui/components/layout/space/Space";

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

  const remaining_sections_total = settings.sections
    .slice(timer.current_section_index)
    .reduce((sum, s) => sum + s.duration_seconds, 0);
  const time_difference = timer.overall_remaining_seconds - remaining_sections_total;

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
            <IonText style={{ fontSize: "2.5rem" }}>
              {getSectionLabel(current.type, current.number, current.merged_count)}
            </IonText>
          </div>
        ) : (
          <Heading size="lg">Watchtower Timer</Heading>
        )}

        <Space />

        <div className="flex-center">
          <IonText style={{ fontSize: "4rem" }} color={is_overtime ? "danger" : "primary"}>
            {formatCountdown(timer.section_remaining_seconds)}
          </IonText>
        </div>

        <Space size="lg" />

        <div>
          {timer.is_playing && (
            <IonButton
              fill="clear"
              size="large"
              disabled={timer.current_section_index <= 0}
              onClick={timer.prev_section}
            >
              <IonText
                style={{
                  fontSize: "2.5rem",
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
              fill="clear"
              size="large"
              disabled={timer.current_section_index >= settings.sections.length - 1}
              onClick={timer.next_section}
            >
              <IonText
                style={{
                  fontSize: "2.5rem",
                }}
              >
                Next
              </IonText>
            </IonButton>
          )}
        </div>

        <Space size="lg" />

        <div style={{ margin: "1.5rem 0" }}>
          <Body size="2xl" color="medium">
            {formatCountdown(timer.overall_remaining_seconds)}{" "}
            <span
              style={{
                color:
                  time_difference >= 0 ? "var(--ion-color-success)" : "var(--ion-color-danger)",
              }}
            >
              ({time_difference >= 0 ? "+" : ""}
              {formatCountdown(time_difference)})
            </span>
          </Body>
        </div>

        <Space size="lg" />

        <IonButton fill="clear" color="medium" onClick={timer.reset}>
          <IonText style={{ fontSize: "2.5rem" }}>Reset</IonText>
        </IonButton>
      </div>
    </>
  );
}
