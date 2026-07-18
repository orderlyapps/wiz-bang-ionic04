import { localStorageKeys } from "@util/constants/localStorageKeys";

export type WeekendMeetingSmsTemplate = { name: string; text: string };

export const DEFAULT_WEEKEND_MEETING_SMS_TEMPLATE_TEXT =
  "Hi {first_name}, you have the {label} assignment for the weekend meeting for the week of {week_label}.";

export const DEFAULT_WEEKEND_MEETING_SMS_TEMPLATES: WeekendMeetingSmsTemplate[] = [
  { name: "Default", text: DEFAULT_WEEKEND_MEETING_SMS_TEMPLATE_TEXT },
];

export const WEEKEND_MEETING_SMS_PLACEHOLDERS = [
  "{first_name}",
  "{label}",
  "{week_label}",
  "{outline_id}",
  "{outline_theme}",
] as const;

export function getWeekendMeetingSmsTemplates(): WeekendMeetingSmsTemplate[] {
  try {
    const stored = localStorage.getItem(localStorageKeys.weekendMeetingSmsTemplate);
    if (stored) {
      const parsed = JSON.parse(stored) as WeekendMeetingSmsTemplate[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return [...DEFAULT_WEEKEND_MEETING_SMS_TEMPLATES];
}

export const WEEKEND_MEETING_SMS_TEMPLATES_CHANGED = "weekend-meeting-sms-templates-changed";

export function saveWeekendMeetingSmsTemplates(templates: WeekendMeetingSmsTemplate[]): void {
  try {
    localStorage.setItem(localStorageKeys.weekendMeetingSmsTemplate, JSON.stringify(templates));
    window.dispatchEvent(new Event(WEEKEND_MEETING_SMS_TEMPLATES_CHANGED));
  } catch {
    /* ignore */
  }
}

export function fillWeekendMeetingSmsTemplate(
  template: string,
  vars: {
    first_name: string;
    label: string;
    week_label: string;
    outline_id: string;
    outline_theme: string;
  },
): string {
  return template
    .replaceAll("{first_name}", vars.first_name)
    .replaceAll("{label}", vars.label)
    .replaceAll("{week_label}", vars.week_label)
    .replaceAll("{outline_id}", vars.outline_id)
    .replaceAll("{outline_theme}", vars.outline_theme);
}
