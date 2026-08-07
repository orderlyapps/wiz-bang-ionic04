import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import type { StudySection } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";

function formatCountdown(seconds: number): string {
  const abs = Math.abs(Math.floor(seconds));
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const sign = seconds < 0 ? "-" : "";
  return `${sign}${m}:${s.toString().padStart(2, "0")}`;
}

interface TimerDisplayProps {
  current_section: StudySection | null;
  section_remaining_seconds: number;
  overall_remaining_seconds: number;
  is_overtime: boolean;
  time_difference_display: number;
}

export function TimerDisplay({
  current_section,
  section_remaining_seconds,
  overall_remaining_seconds,
  is_overtime,
  time_difference_display,
}: TimerDisplayProps) {
  return (
    <>
      <div className="ion-padding ion-text-center">
        {current_section ? (
          <div className="flex-center ion-padding">
            <IonText style={{ fontSize: "40px" }}>{current_section.name}</IonText>
          </div>
        ) : (
          <Heading size="lg">Congregation Bible Study</Heading>
        )}

        <div className="flex-center">
          <IonText style={{ fontSize: "120px" }} color={is_overtime ? "danger" : "primary"}>
            {formatCountdown(section_remaining_seconds)}
          </IonText>
        </div>
      </div>

      <IonGrid style={{ margin: "40px 0" }}>
        <IonRow>
          <IonCol>
            <IonText style={{ fontSize: "40px" }}>
              {formatCountdown(overall_remaining_seconds)}
            </IonText>
          </IonCol>
          <IonCol>
            <IonText
              style={{ fontSize: "40px" }}
              color={time_difference_display >= 0 ? "success" : "danger"}
            >
              {time_difference_display >= 0 ? "+" : ""}
              {formatCountdown(time_difference_display)}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
