import { Fragment, useState } from "react";
import { IonItem } from "@ionic/react";
import { reportCollection } from "@shared/database/collections/report";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Report } from "@shared/database/schemas/report";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { NumberInput } from "@ui/components/inputs/number/NumberInput";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import {
  HourCreditsModal,
  type CreditHours,
} from "./components/hour-credits-modal/HourCreditsModal";

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  credit_hours: CreditHours;
  comments: string;
}

const default_form: FormState = {
  active: false,
  hours: "",
  bible_studies: "",
  credit_hours: {},
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
  const [show_credits_modal, set_show_credits_modal] = useState(false);

  if (existing_report && !initialized) {
    set_form({
      active: existing_report.active,
      hours: existing_report.hours != null ? String(existing_report.hours) : "",
      bible_studies:
        existing_report.bible_studies != null ? String(existing_report.bible_studies) : "",
      credit_hours: existing_report.credit_hours ?? {},
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
      credit_hours: Object.keys(form.credit_hours).length > 0 ? form.credit_hours : null,
      comments: form.comments.trim() || null,
    };

    if (existing_report) {
      reportCollection.update(makeCompositeKey(confidential_id, congregation_id, date), (draft) => {
        draft.active = payload.active;
        draft.hours = payload.hours;
        draft.bible_studies = payload.bible_studies;
        draft.credit_hours = payload.credit_hours;
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

  const month_label = new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <IonItem lines="none">
        <Heading size="lg" bold color="medium">
          {month_label}
        </Heading>
      </IonItem>

      <ToggleInput
        label="Participated"
        checked={form.active}
        on_change={(checked) => {
          set_form((prev) => ({
            ...prev,
            active: checked,
            hours: checked ? prev.hours : "",
            bible_studies: checked ? prev.bible_studies : "",
            credit_hours: checked ? prev.credit_hours : {},
          }));
        }}
      />

      <NumberInput
        label="Hours"
        value={form.hours}
        placeholder="optional"
        disabled={!form.active}
        on_change={(val) => updateField("hours", val)}
      />

      <NumberInput
        label="Bible Studies"
        value={form.bible_studies}
        disabled={!form.active}
        on_change={(val) => updateField("bible_studies", val)}
      />

      <TextareaInput
        label="Comments"
        value={form.comments}
        on_change={(val) => updateField("comments", val)}
      />

      {Object.entries(form.credit_hours).map(([key, val]) => (
        <Fragment key={key}>
          <NumberInput
            label={`${key.toUpperCase()} Hours`}
            value={String(val)}
            disabled={!form.active}
            on_change={(input_val) => {
              set_form((prev) => {
                const next = { ...prev.credit_hours };
                if (input_val !== "") {
                  next[key] = Number(input_val);
                } else {
                  delete next[key];
                }
                return { ...prev, credit_hours: next };
              });
            }}
          />

          <IonItem lines="none">
            <div slot="end">
              <TextButton
                size="small"
                disabled={!form.active}
                label="Remove Credit"
                fill="clear"
                color="danger"
                on_click={() => {
                  set_form((prev) => {
                    const next = { ...prev.credit_hours };
                    delete next[key];
                    return { ...prev, credit_hours: next };
                  });
                }}
              />
            </div>
          </IonItem>
        </Fragment>
      ))}

      <Space />

      <TextButton
        on_click={() => set_show_credits_modal(true)}
        label="+ Hour Credits"
        fill="clear"
        disabled={!form.active}
      />

      <Space />

      <TextButton on_click={handleSave} label={existing_report ? "Update Report" : "Save Report"} />

      <HourCreditsModal
        is_open={show_credits_modal}
        on_dismiss={() => set_show_credits_modal(false)}
        on_save={(credits: CreditHours) => set_form((prev) => ({ ...prev, credit_hours: credits }))}
        initial_values={form.credit_hours}
      />
    </>
  );
}
