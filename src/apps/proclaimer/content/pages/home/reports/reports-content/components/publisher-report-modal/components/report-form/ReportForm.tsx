import { useState } from "react";
import { IonButton, IonInput, IonItem, IonTextarea, IonToggle } from "@ionic/react";
import { reportCollection } from "@shared/database/collections/report";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Report } from "@shared/database/schemas/report";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  comments: string;
}

const default_form: FormState = {
  active: false,
  hours: "",
  bible_studies: "",
  comments: "",
};

interface ReportFormProps {
  confidential_id: string;
  group_id: string | null;
  date: string;
  existing_report: Report | undefined;
  on_save: () => void;
}

export function ReportForm({
  confidential_id,
  group_id,
  date,
  existing_report,
  on_save,
}: ReportFormProps) {
  const [form, set_form] = useState<FormState>(default_form);
  const [initialized, set_initialized] = useState(false);

  if (existing_report && !initialized) {
    set_form({
      active: existing_report.active,
      hours: existing_report.hours != null ? String(existing_report.hours) : "",
      bible_studies:
        existing_report.bible_studies != null ? String(existing_report.bible_studies) : "",
      comments: existing_report.comments ?? "",
    });
    set_initialized(true);
  }

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    set_form((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const congregation_id = getStoredCongregation()?.id;
    if (!congregation_id) return;

    const payload = {
      confidential_id,
      congregation_id,
      group_id,
      date,
      active: form.active,
      hours: form.hours !== "" ? Number(form.hours) : null,
      bible_studies: form.bible_studies !== "" ? Number(form.bible_studies) : null,
      comments: form.comments.trim() || null,
    };

    if (existing_report) {
      reportCollection.update(makeCompositeKey(confidential_id, congregation_id, date), (draft) => {
        draft.active = payload.active;
        draft.hours = payload.hours;
        draft.bible_studies = payload.bible_studies;
        draft.comments = payload.comments;
        if (draft.group_id == null && group_id != null) {
          draft.group_id = group_id;
        }
      });
    } else {
      reportCollection.insert(payload);
    }

    on_save();
  };

  return (
    <>
      <IonItem>
        <Label>Participated</Label>
        <IonToggle
          slot="end"
          checked={form.active}
          onIonChange={(e) => {
            const checked = e.detail.checked;
            set_form((prev) => ({
              ...prev,
              active: checked,
              hours: checked ? prev.hours : "",
              bible_studies: checked ? prev.bible_studies : "",
            }));
          }}
        />
      </IonItem>
      <IonItem disabled={!form.active}>
        <Label>Hours</Label>
        <IonInput
          className="ion-text-end"
          type="number"
          slot="end"
          min="0"
          value={form.hours}
          placeholder="optional"
          onIonInput={(e) => updateField("hours", e.detail.value ?? "")}
        />
      </IonItem>
      <IonItem disabled={!form.active}>
        <Label>Bible Studies</Label>
        <IonInput
          slot="end"
          type="number"
          className="ion-text-end"
          min="0"
          value={form.bible_studies}
          onIonInput={(e) => updateField("bible_studies", e.detail.value ?? "")}
        />
      </IonItem>
      <IonItem>
        <Label>Comments</Label>
        <IonTextarea
          slot="end"
          className="ion-text-end"
          value={form.comments}
          autoGrow
          onIonInput={(e) => updateField("comments", e.detail.value ?? "")}
        />
      </IonItem>

      <Space />

      <IonButton expand="block" className="ion-margin" onClick={handleSave}>
        {existing_report ? "Update Report" : "Save Report"}
      </IonButton>
    </>
  );
}
