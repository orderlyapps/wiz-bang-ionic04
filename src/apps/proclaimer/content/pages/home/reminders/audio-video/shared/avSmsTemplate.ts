import { localStorageKeys } from "@util/constants/localStorageKeys";

export const DEFAULT_AV_SMS_TEMPLATE =
  "Hi {first_name}, you have the {label} assignment for the {meeting} meeting for the week of {week_label}.";

export const AV_SMS_PLACEHOLDERS = [
  "{first_name}",
  "{label}",
  "{meeting}",
  "{week_label}",
] as const;

export function getAvSmsTemplate(): string {
  try {
    return localStorage.getItem(localStorageKeys.avSmsTemplate) ?? DEFAULT_AV_SMS_TEMPLATE;
  } catch {
    return DEFAULT_AV_SMS_TEMPLATE;
  }
}

export function saveAvSmsTemplate(template: string): void {
  try {
    localStorage.setItem(localStorageKeys.avSmsTemplate, template);
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
