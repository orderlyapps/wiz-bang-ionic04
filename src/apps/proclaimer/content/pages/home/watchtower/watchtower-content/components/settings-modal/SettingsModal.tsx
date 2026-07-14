import { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { close, refresh } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { SectionEditModal } from "../section-edit-modal/SectionEditModal";
import type { WatchtowerSection } from "@proclaimer-content/pages/home/watchtower/watchtower-content/hooks/useWatchtowerSettings";

interface SettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  sections: WatchtowerSection[];
  end_time: string | null;
  on_update_duration: (section_id: string, duration_seconds: number) => void;
  on_add_after: (section_id: string) => void;
  on_delete: (section_id: string) => void;
  on_merge_next: (section_id: string) => void;
  on_unmerge: (section_id: string) => void;
  on_set_end_time: (end_time: string | null) => void;
  on_reset: () => void;
}

function getSectionLabel(section: WatchtowerSection): string {
  switch (section.type) {
    case "intro":
      return "Intro";
    case "numbered":
      return section.merged_count > 0
        ? `Paragraph ${section.number}-${(section.number ?? 0) + section.merged_count}`
        : `Paragraph ${section.number}`;
    case "review":
      return `Review ${section.number}`;
    case "summary":
      return "Summary";
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SettingsModal({
  is_open,
  on_dismiss,
  sections,
  end_time,
  on_update_duration,
  on_add_after,
  on_delete,
  on_merge_next,
  on_unmerge,
  on_set_end_time,
  on_reset,
}: SettingsModalProps) {
  const [editing_section_id, setEditingSectionId] = useState<string | null>(null);
  const editing_section = editing_section_id
    ? (sections.find((s) => s.id === editing_section_id) ?? null)
    : null;

  const handle_section_click = (section: WatchtowerSection) => {
    setEditingSectionId(section.id);
  };

  const handle_section_edit_dismiss = () => {
    setEditingSectionId(null);
  };

  return (
    <>
      <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
            <IonButton fill="clear" onClick={on_dismiss} slot="end">
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="ion-text-center ion-padding-bottom">
            <IonLabel color="medium">
              Total: {formatDuration(sections.reduce((sum, s) => sum + s.duration_seconds, 0))}
            </IonLabel>
          </div>
          <TimeInput
            label="End Time"
            value={end_time ?? ""}
            on_change={(val) => on_set_end_time(val || null)}
          />

          <IonList inset>
            {sections.map((section) => (
              <IonItem key={section.id} button detail onClick={() => handle_section_click(section)}>
                <IonLabel>{getSectionLabel(section)}</IonLabel>
                <IonLabel slot="end" color="medium">
                  {formatDuration(section.duration_seconds)}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

          <div className="ion-padding-top ion-text-center">
            <IonButton fill="clear" color="warning" onClick={on_reset}>
              <IonIcon slot="start" icon={refresh} />
              Reset to defaults
            </IonButton>
          </div>
        </IonContent>
      </ResponsiveModal>

      <SectionEditModal
        section={editing_section}
        sections={sections}
        is_open={editing_section !== null}
        on_dismiss={handle_section_edit_dismiss}
        on_select_section={setEditingSectionId}
        on_update_duration={on_update_duration}
        on_add_after={on_add_after}
        on_delete={on_delete}
        on_merge_next={on_merge_next}
        on_unmerge={on_unmerge}
      />
    </>
  );
}
