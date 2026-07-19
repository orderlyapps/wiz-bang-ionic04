import { IonItem, IonLabel } from "@ionic/react";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { Select } from "@ui/components/inputs/select/Select";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { useSubmitMinistryTime } from "./use-submit-ministry-time";

export function SubmitMinistryTime() {
  const {
    phone,
    selected_month,
    month_options,
    total_hours,
    credit_hours,
    bible_studies,
    comments,
    sms_url,
    can_send,
    set_phone,
    set_selected_month,
    set_bible_studies,
    set_comments,
  } = useSubmitMinistryTime();

  function handleSendSms() {
    window.location.href = sms_url;
  }

  return (
    <>
      <Select
        label="Month"
        value={selected_month}
        options={month_options}
        interface_type="popover"
        on_change={(v) => set_selected_month(v as string)}
      />
      <IonItem lines="none">
        <IonLabel slot="end">
          <Body size="sm" bold>
            Total Hours:{" "}
          </Body>
          <Body size="sm">{total_hours}</Body>
        </IonLabel>
      </IonItem>
      {credit_hours.length > 0 && (
        <IonItem lines="none">
          <IonLabel slot="end" className="ion-text-end">
            {credit_hours.map((c) => (
              <>
                <Body key={c.type} size="sm" color="medium">
                  {c.label}: {c.hours}
                </Body>
                <br />
              </>
            ))}
          </IonLabel>
        </IonItem>
      )}
      <IncrementInput
        label="Bible Studies"
        value={bible_studies}
        min={0}
        on_change={set_bible_studies}
      />
      <TextInput
        label="Comments"
        value={comments}
        placeholder="Optional"
        on_change={set_comments}
      />
      <Space size="md" />
      <PhoneInput
        label="Report to (mobile)"
        value={phone}
        placeholder="+61 4XX XXX XXX"
        on_change={set_phone}
      />
      <Space size="md" />
      <TextButton
        label="Send via SMS"
        color="primary"
        fill="solid"
        disabled={!can_send}
        on_click={handleSendSms}
      />
      <Space size="2xl" />
    </>
  );
}
