import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export type AvScheduleContentProps = {
  week_id: string;
  base_path: string;
};

export type AvAssignmentGroup = {
  id: string;
  title: string;
  color: IonicColor;
  is_header: boolean;
  assignment_id?: AvAssignmentID;
  publisher?: string;
  base_path: string;
  week_id: string;
};
