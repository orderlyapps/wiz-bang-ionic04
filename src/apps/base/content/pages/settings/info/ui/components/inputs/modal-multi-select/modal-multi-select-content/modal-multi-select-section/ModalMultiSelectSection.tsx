import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { ModalMultiSelect } from "@ui/components/inputs/modal-multi-select/ModalMultiSelect";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { Body } from "@ui/components/display/text/body/Body";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const TAGS = ["Design", "Engineering", "Marketing", "Sales", "Support", "Operations"];

const props = [
  { label: "label", value: "— Display label shown in the InputWrapper row." },
  {
    label: "display_value",
    value:
      "— ReactNode rendered as the current value. Pass null/undefined to show the placeholder. Use this to render chips, comma-separated text, counts, or any custom layout.",
  },
  {
    label: "placeholder",
    value: '— Fallback text shown when display_value is null/undefined. Defaults to "Select...".',
  },
  { label: "disabled", value: "— Disables the trigger. Defaults to false." },
  {
    label: "on_open",
    value: "— Called when the trigger is tapped. The consumer controls the modal — open it here.",
  },
];

export function ModalMultiSelectSection() {
  const [tags, set_tags] = useState<string[]>([]);
  const [tags_open, set_tags_open] = useState(false);

  const tags_display =
    tags.length > 0 ? (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {tags.map((t) => (
          <IonChip key={t} style={{ margin: 0 }}>
            {t}
          </IonChip>
        ))}
      </div>
    ) : null;

  const [roles, set_roles] = useState<string[]>([]);
  const [roles_open, set_roles_open] = useState(false);
  const ROLES = ["Admin", "Editor", "Viewer", "Owner"];

  const roles_display = roles.length > 0 ? <Body size="sm">{roles.join(", ")}</Body> : null;

  return (
    <ComponentSection
      title="Modal Multi Select"
      description="A multi-value styled trigger (InputWrapper + chevron) that fires on_open when tapped. display_value is a ReactNode — render chips, comma-separated text, a count badge, or anything else. The consumer owns the modal and selection state."
      props={props}
    >
      <ModalMultiSelect
        label="Tags (chips)"
        display_value={tags_display}
        placeholder="Choose tags"
        on_open={() => set_tags_open(true)}
      />
      <ResponsiveModal isOpen={tags_open} onDidDismiss={() => set_tags_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Tags</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => set_tags_open(false)}>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {TAGS.map((tag) => (
              <IonItem
                key={tag}
                button
                detail={false}
                onClick={() =>
                  set_tags((prev) =>
                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
                  )
                }
              >
                <IonLabel>{tag}</IonLabel>
                {tags.includes(tag) && <IonIcon icon={checkmark} slot="end" />}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </ResponsiveModal>

      <ModalMultiSelect
        label="Roles (text)"
        display_value={roles_display}
        placeholder="Choose roles"
        on_open={() => set_roles_open(true)}
      />
      <ResponsiveModal isOpen={roles_open} onDidDismiss={() => set_roles_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Roles</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => set_roles_open(false)}>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {ROLES.map((role) => (
              <IonItem
                key={role}
                button
                detail={false}
                onClick={() =>
                  set_roles((prev) =>
                    prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
                  )
                }
              >
                <IonLabel>{role}</IonLabel>
                {roles.includes(role) && <IonIcon icon={checkmark} slot="end" />}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </ResponsiveModal>

      <ModalMultiSelect
        label="Disabled"
        display_value={null}
        placeholder="Cannot open"
        disabled
        on_open={() => {}}
      />
    </ComponentSection>
  );
}
