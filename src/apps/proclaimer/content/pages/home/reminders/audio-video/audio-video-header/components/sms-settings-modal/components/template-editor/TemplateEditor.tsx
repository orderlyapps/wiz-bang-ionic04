import { useRef, useState } from "react";
import { IonTextarea, IonChip, IonLabel, IonButton, IonIcon, IonItem } from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { Space } from "@ui/components/layout/space/Space";
import {
  type AvSmsTemplate,
  DEFAULT_AV_SMS_TEMPLATE_TEXT,
  AV_SMS_PLACEHOLDERS,
} from "../../../../../shared/avSmsTemplate";

interface TemplateEditorProps {
  index: number;
  template: AvSmsTemplate;
  on_change: (template: AvSmsTemplate) => void;
}

export function TemplateEditor({ index, template, on_change }: TemplateEditorProps) {
  const [name, set_name] = useState(template.name);
  const [text, set_text] = useState(template.text);
  const textarea_ref = useRef<HTMLIonTextareaElement>(null);
  const cursor_pos = useRef(0);

  function get_native_textarea(): HTMLTextAreaElement | null {
    return textarea_ref.current?.querySelector("textarea") ?? null;
  }

  function handle_name_change(value: string) {
    set_name(value);
    on_change({ name: value, text });
  }

  function handle_text_change(value: string) {
    set_text(value);
    on_change({ name, text: value });
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
    const new_text = text.slice(0, pos) + ph + text.slice(pos);
    handle_text_change(new_text);

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
    set_text(DEFAULT_AV_SMS_TEMPLATE_TEXT);
    on_change({ name, text: DEFAULT_AV_SMS_TEMPLATE_TEXT });
  }

  return (
    <>
      <TextInput
        label="Name"
        value={name}
        placeholder={`Template ${index + 1}`}
        on_change={handle_name_change}
      />
      <Space size="xs" />
      <InputWrapper label="SMS Text">
        <IonTextarea
          ref={textarea_ref}
          value={text}
          autoGrow
          rows={3}
          onIonInput={(e) => handle_text_change(e.detail.value ?? "")}
          onIonBlur={handle_blur}
        />
      </InputWrapper>
      <Space size="xs" />
      <IonItem lines="none" onMouseDown={(e) => e.preventDefault()}>
        {AV_SMS_PLACEHOLDERS.map((ph) => (
          <IonChip key={ph} onClick={() => handle_chip_click(ph)}>
            <IonLabel>{ph}</IonLabel>
          </IonChip>
        ))}
      </IonItem>
      <Space size="xs" />
      <IonItem lines="none">
        <IonButton slot="end" fill="clear" color="warning" size="small" onClick={handle_reset}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reset text
        </IonButton>
      </IonItem>
      <Space />
    </>
  );
}
