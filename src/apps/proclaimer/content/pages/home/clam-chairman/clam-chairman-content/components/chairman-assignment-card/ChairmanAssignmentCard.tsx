import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { usePublisherPhoneLookup } from "@proclaimer-content/pages/home/congregation-admin/auth-users/auth-users-content/hooks/usePublisherPhone";
import type { AssignmentRow } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/types";

const sectionLabels = ["main_hall_label", "second_school_label"];

interface ChairmanAssignmentCardProps extends AssignmentRow {
  publisher_id?: string;
  publisher_first_name?: string;
}

function buildSmsLink(phone: string, body: string): string {
  const encodedBody = encodeURIComponent(body);
  return `sms:${phone}?body=${encodedBody}`;
}

export function ChairmanAssignmentCard({
  id,
  title,
  color,
  publisher,
  assistant,
  publisher_id,
  publisher_first_name,
}: ChairmanAssignmentCardProps) {
  const phoneLookup = usePublisherPhoneLookup();
  const phone = publisher_id ? phoneLookup(publisher_id) : null;

  const handle_click = () => {
    if (!phone) return;
    const name = publisher_first_name ?? "";
    const message = `Hi ${name},\nThis is a reminder for your CLAM assignment:\n\n${title.toUpperCase()}${assistant ? `\n\nYour assistant is ${assistant}.` : ""}`;
    window.location.href = buildSmsLink(phone, message);
  };

  return (
    <LabelValueItem
      label={title}
      value={publisher}
      label_color={color}
      label_size={sectionLabels.includes(id) ? "lg" : "sm"}
      value_2={assistant}
      value_2_color="medium"
      on_click={phone ? handle_click : undefined}
    />
  );
}
