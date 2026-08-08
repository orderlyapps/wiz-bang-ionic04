import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export type ScheduleContentProps = {
  week_id: string;
  base_path: string;
};

export type AssignmentItem = {
  title: string;
  time: number | null;
  assignmentId: MidweekAssignmentId | (string & {});
  color: IonicColor;
  assistantId?: MidweekAssignmentId;
  pin_to_first_column?: boolean;
  publisher_override?: string;
  is_read_only?: boolean;
};

export type AssignmentRow = {
  id: string;
  week_id: string;
  title: string;
  color: IonicColor;
  publisher?: string;
  assistant?: string;
  pin_to_first_column?: boolean;
  is_read_only?: boolean;
  base_path: string;
};
