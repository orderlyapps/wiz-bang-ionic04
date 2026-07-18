import { useRef, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonList,
  IonButton,
  IonChip,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import {
  DEFAULT_AV_SMS_TEMPLATE,
  AV_SMS_PLACEHOLDERS,
  getAvSmsTemplate,
  saveAvSmsTemplate,
} from "../../../shared/avSmsTemplate";

interface SmsSettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SmsSettingsModal({ is_open, on_dismiss }: SmsSettingsModalProps) {
  const [template, set_template] = useState(() => getAvSmsTemplate());
  const textarea_ref = useRef<HTMLIonTextareaElement>(null);
  const cursor_pos = useRef(0);

  function get_native_textarea(): HTMLTextAreaElement | null {
    return textarea_ref.current?.querySelector("textarea") ?? null;
  }

  function handle_change(value: string) {
    set_template(value);
    saveAvSmsTemplate(value);
  }

  function handle_blur() {
    const native = get_native_textarea();
    if (native) {
      cursor_pos.current = native.selectionStart ?? 0;
    }
  }

  function handle_chip_click(ph: string) {
    const native = get_native_textarea();
    const pos = native?.selectionStart ?? cursor_pos.current;
    const new_template = template.slice(0, pos) + ph + template.slice(pos);
    handle_change(new_template);

    requestAnimationFrame(() => {
      const el = get_native_textarea();
      if (el) {
        el.focus();
        const new_pos = pos + ph.length;
        el.setSelectionRange(new_pos, new_pos);
      }
    });
  }

  function handle_reset() {
    set_template(DEFAULT_AV_SMS_TEMPLATE);
    saveAvSmsTemplate(DEFAULT_AV_SMS_TEMPLATE);
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SMS Template</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <InputWrapper label="Default SMS Text">
            <IonTextarea
              ref={textarea_ref}
              value={template}
              autoGrow
              rows={5}
              onIonInput={(e) => handle_change(e.detail.value ?? "")}
              onIonBlur={handle_blur}
            />
          </InputWrapper>
        </IonList>
        <Space size="sm" />
        <Body size="sm" color="medium">
          Tap to insert:
        </Body>
        <Space size="xs" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {AV_SMS_PLACEHOLDERS.map((ph) => (
            <IonChip key={ph} onClick={() => handle_chip_click(ph)}>
              <IonLabel>{ph}</IonLabel>
            </IonChip>
          ))}
        </div>
        <Space size="sm" />
        <IonButton fill="clear" color="warning" onClick={handle_reset}>
          Reset to default
        </IonButton>
      </IonContent>
    </ResponsiveModal>
  );
}
