import { localStorageKeys } from "@util/constants/localStorageKeys";

export type AvSmsTemplate = { name: string; text: string };

export const DEFAULT_AV_SMS_TEMPLATE_TEXT =
  "Hi {first_name}, you have the {label} assignment for the {meeting} meeting for the week of {week_label}.";

export const DEFAULT_AV_SMS_TEMPLATES: AvSmsTemplate[] = [
  { name: "Default", text: DEFAULT_AV_SMS_TEMPLATE_TEXT },
];

export const AV_SMS_PLACEHOLDERS = [
  "{first_name}",
  "{label}",
  "{meeting}",
  "{week_label}",
] as const;

export function getAvSmsTemplates(): AvSmsTemplate[] {
  try {
    const stored = localStorage.getItem(localStorageKeys.avSmsTemplate);
    if (stored) {
      const parsed = JSON.parse(stored) as AvSmsTemplate[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return [...DEFAULT_AV_SMS_TEMPLATES];
}

export function saveAvSmsTemplates(templates: AvSmsTemplate[]): void {
  try {
    localStorage.setItem(localStorageKeys.avSmsTemplate, JSON.stringify(templates));
  } catch {
    /* ignore */
  }
}

export function fillAvSmsTemplate(
  template: string,
  vars: { first_name: string; label: string; meeting: string; week_label: string },
): string {
  return template
    .replaceAll("{first_name}", vars.first_name)
    .replaceAll("{label}", vars.label)
    .replaceAll("{meeting}", vars.meeting)
    .replaceAll("{week_label}", vars.week_label);
}
