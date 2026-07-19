import { useEffect, useState } from "react";
import { useMinistryTime } from "@proclaimer-content/pages/home/ministry-time/ministry-time-content/hooks/useMinistryTime";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getPreviousMonthValue } from "@util/format/report-date";
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

const CREDIT_TYPES = ["ldc", "bethel", "hlc", "school"] as const;
type CreditType = (typeof CREDIT_TYPES)[number];

const CREDIT_LABELS: Record<CreditType, string> = {
  ldc: "LDC",
  bethel: "Bethel",
  hlc: "HLC",
  school: "School",
};

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
  credit_hours: { type: CreditType; label: string; hours: string }[];
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
  const [selected_month, set_selected_month] = useState(getPreviousMonthValue());
  const [bible_studies, set_bible_studies] = useState(stored?.bible_studies ?? 0);
  const [comments, set_comments] = useState(stored?.comments ?? "");

  const month_options = generateMonthOptions();

  const month_entries = entries.filter((e) => e.date.startsWith(selected_month));

  const non_credit_minutes = month_entries
    .filter((e) => !CREDIT_TYPES.includes(e.ministry_type as CreditType))
    .reduce((sum, e) => sum + e.minutes, 0);
  const total_hours = (non_credit_minutes / 60).toFixed(1);

  const credit_hours = CREDIT_TYPES.map((type) => {
    const minutes = month_entries
      .filter((e) => e.ministry_type === type)
      .reduce((sum, e) => sum + e.minutes, 0);
    return { type, label: CREDIT_LABELS[type], hours: (minutes / 60).toFixed(1) };
  }).filter((c) => parseFloat(c.hours) > 0);

  const month_label =
    month_options.find((o) => o.value === selected_month)?.label ?? selected_month;

  const credit_lines = credit_hours.map((c) => `${c.label}: ${c.hours}`);

  const sms_body = [
    `Report for ${month_label}`,
    publisher_name ? `Name: ${publisher_name}` : null,
    `Hours: ${total_hours}`,
    credit_lines.length > 0 ? credit_lines.join("\n") : null,
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
    credit_hours,
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
