import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface RemindersHeaderProps {
  on_add: () => void;
}

export function RemindersHeader({ on_add }: RemindersHeaderProps) {
  return <PermissionHeader title="Reminders" on_add={on_add} />;
}
