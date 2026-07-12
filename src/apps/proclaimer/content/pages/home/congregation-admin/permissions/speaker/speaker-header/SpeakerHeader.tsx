import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface SpeakerHeaderProps {
  on_add: () => void;
}

export function SpeakerHeader({ on_add }: SpeakerHeaderProps) {
  return <PermissionHeader title="Speaker" on_add={on_add} />;
}
