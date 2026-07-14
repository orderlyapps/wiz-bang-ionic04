import { IonButton, IonIcon, IonLabel, IonList, IonItem } from "@ionic/react";
import { play, pause, playForward, playBack } from "ionicons/icons";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
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
        ? `Section ${number}-${(number ?? 0) + merged_count}`
        : `Section ${number}`;
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
          <Heading size="lg">
            {getSectionLabel(current.type, current.number, current.merged_count)}
          </Heading>
        ) : (
          <Heading size="lg">Watchtower Timer</Heading>
        )}

        <div style={{ margin: "2rem 0" }}>
          <Heading size="2xl" color={is_overtime ? "danger" : "primary"} bold={is_overtime}>
            {formatCountdown(timer.section_remaining_seconds)}
          </Heading>
          <Body color="medium">Section remaining</Body>
        </div>

        <div style={{ margin: "1.5rem 0" }}>
          <Body color="medium">Overall remaining</Body>
          <Heading size="lg">{formatCountdown(timer.overall_remaining_seconds)}</Heading>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          <IonButton
            fill="clear"
            size="large"
            disabled={timer.current_section_index <= 0}
            onClick={timer.prev_section}
          >
            <IonIcon slot="icon-only" icon={playBack} />
          </IonButton>

          {!timer.is_playing ? (
            <IonButton size="large" shape="round" onClick={timer.play}>
              <IonIcon slot="icon-only" icon={play} />
            </IonButton>
          ) : (
            <IonButton size="large" shape="round" color="warning" onClick={timer.pause}>
              <IonIcon slot="icon-only" icon={pause} />
            </IonButton>
          )}

          <IonButton
            fill="clear"
            size="large"
            disabled={timer.current_section_index >= settings.sections.length - 1}
            onClick={timer.next_section}
          >
            <IonIcon slot="icon-only" icon={playForward} />
          </IonButton>
        </div>

        <IonButton fill="clear" color="medium" onClick={timer.reset}>
          Reset
        </IonButton>
      </div>

      <IonList inset>
        {settings.sections.map((section, idx) => (
          <IonItem
            key={section.id}
            color={idx === timer.current_section_index ? "primary" : undefined}
          >
            <IonLabel>
              {getSectionLabel(section.type, section.number, section.merged_count)}
            </IonLabel>
            <IonLabel slot="end" color="medium">
              {Math.floor(section.duration_seconds / 60)}:
              {(section.duration_seconds % 60).toString().padStart(2, "0")}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
