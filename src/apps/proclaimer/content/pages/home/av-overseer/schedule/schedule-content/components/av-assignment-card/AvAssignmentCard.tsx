import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AvAssignmentGroup } from "../../helper/types";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";

export function AvAssignmentCard({
  id,
  week_id,
  title,
  color,
  publisher,
  is_header,
  base_path,
  assignment_id,
}: AvAssignmentGroup) {
  const permissions = usePermissions();
  const can_edit = permissions.has_av_overseer;

  return (
    <LabelValueItem
      label={title}
      value={publisher}
      label_color={color}
      label_size={is_header ? "lg" : "sm"}
      router_link={
        can_edit && !is_header && assignment_id
          ? `${base_path}/${week_id}/assignment/${id}`
          : undefined
      }
    />
  );
}
