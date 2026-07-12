import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface CleaningHeaderProps {
  on_add: () => void;
}

export function CleaningHeader({ on_add }: CleaningHeaderProps) {
  return <PermissionHeader title="Cleaning" on_add={on_add} />;
}
