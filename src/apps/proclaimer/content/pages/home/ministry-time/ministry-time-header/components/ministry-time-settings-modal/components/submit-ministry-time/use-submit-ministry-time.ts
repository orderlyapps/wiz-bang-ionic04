import { useEffect, useState } from "react";
import { useMinistryTime } from "@proclaimer-content/pages/home/ministry-time/ministry-time-content/hooks/useMinistryTime";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { loadMinistryReportForm, saveMinistryReportForm } from "./submit-ministry-time-storage";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function previousMonthValue(): string {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function generateMonthOptions(): { value: string; label: string }[] {
  const now = new Date();
  const options: { value: string; label: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    options.push({ value, label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` });
  }
  return options;
}

function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function buildSmsUrl(phone: string, body: string): string {
  const clean_phone = sanitizePhone(phone);
  return `sms:${clean_phone}?&body=${encodeURIComponent(body)}`;
}

export type UseSubmitMinistryTimeResult = {
  publisher_name: string;
  phone: string;
  selected_month: string;
  month_options: { value: string; label: string }[];
  total_hours: string;
  bible_studies: number;
  comments: string;
  sms_url: string;
  can_send: boolean;
  set_phone: (value: string) => void;
  set_selected_month: (value: string) => void;
  set_bible_studies: (value: number) => void;
  set_comments: (value: string) => void;
};

export function useSubmitMinistryTime(): UseSubmitMinistryTimeResult {
  const { entries } = useMinistryTime();
  const publisher = useStoredPublisher();
  const stored = loadMinistryReportForm();
  const publisher_name = publisher ? getPublisherDisplayName(publisher, "first_last") : "";

  const [phone, set_phone] = useState(stored?.phone ?? "");
  const [selected_month, set_selected_month] = useState(previousMonthValue());
  const [bible_studies, set_bible_studies] = useState(stored?.bible_studies ?? 0);
  const [comments, set_comments] = useState(stored?.comments ?? "");

  const month_options = generateMonthOptions();

  const month_entries = entries.filter((e) => e.date.startsWith(selected_month));
  const total_minutes = month_entries.reduce((sum, e) => sum + e.minutes, 0);
  const total_hours = (total_minutes / 60).toFixed(1);

  const month_label =
    month_options.find((o) => o.value === selected_month)?.label ?? selected_month;

  const sms_body = [
    `Report for ${month_label}`,
    publisher_name ? `Name: ${publisher_name}` : null,
    `Hours: ${total_hours}`,
    `Bible Studies: ${bible_studies}`,
    comments ? `Comments: ${comments}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const sms_url = buildSmsUrl(phone, sms_body);
  const can_send = sanitizePhone(phone).length > 0;

  useEffect(() => {
    saveMinistryReportForm({ phone, bible_studies, comments });
  }, [phone, bible_studies, comments]);

  return {
    publisher_name,
    phone,
    selected_month,
    month_options,
    total_hours,
    bible_studies,
    comments,
    sms_url,
    can_send,
    set_phone,
    set_selected_month,
    set_bible_studies,
    set_comments,
  };
}
