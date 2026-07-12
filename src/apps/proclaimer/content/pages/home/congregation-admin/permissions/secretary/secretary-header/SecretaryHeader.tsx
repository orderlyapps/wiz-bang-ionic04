import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface SecretaryHeaderProps {
  on_add: () => void;
}

export function SecretaryHeader({ on_add }: SecretaryHeaderProps) {
  return <PermissionHeader title="Secretary" on_add={on_add} />;
}
