import { IonChip } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

interface ParticipationSectionProps {
  title: string;
  participations: { participation_id: string }[];
  labels: Record<string, string>;
}

export function ParticipationSection({ title, participations, labels }: ParticipationSectionProps) {
  if (participations.length === 0) return null;

  return (
    <>
      <Heading size="lg" bold>
        {title}
      </Heading>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {participations.map((p) => (
          <IonChip key={p.participation_id}>
            {labels[p.participation_id] ?? p.participation_id}
          </IonChip>
        ))}
      </div>
      <Space />
    </>
  );
}
