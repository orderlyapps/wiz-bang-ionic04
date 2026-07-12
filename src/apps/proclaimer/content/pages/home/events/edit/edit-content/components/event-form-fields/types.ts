export interface EventFormFieldProps {
  name: string;
  description: string;
  address: string;
  type: string;
  all_day: boolean;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  on_change: (field: string, value: string | boolean) => void;
}
