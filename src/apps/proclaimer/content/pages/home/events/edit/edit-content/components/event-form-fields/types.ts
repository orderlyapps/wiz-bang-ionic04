export interface CircuitVisitFormDetails {
  midweek_theme: string;
  weekend_theme: string;
  pioneer_meeting_time: string;
}

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
  details: CircuitVisitFormDetails;
  on_change: (field: string, value: string | boolean) => void;
  on_details_change: (field: keyof CircuitVisitFormDetails, value: string) => void;
}
