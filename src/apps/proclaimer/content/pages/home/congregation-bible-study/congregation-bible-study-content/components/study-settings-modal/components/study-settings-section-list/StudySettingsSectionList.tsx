import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { StudySection } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";

interface StudySettingsSectionListProps {
  sections: StudySection[];
  on_select: (section_id: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function StudySettingsSectionList({ sections, on_select }: StudySettingsSectionListProps) {
  return (
    <IonList inset>
      {sections.map((section) => (
        <IonItem key={section.id} button detail onClick={() => on_select(section.id)}>
          <IonLabel>{section.name}</IonLabel>
          <IonLabel slot="end" color="medium">
            {formatDuration(section.duration_seconds)}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
