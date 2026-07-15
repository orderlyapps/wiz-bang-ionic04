export interface PublisherRecordData {
  full_name: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  display_name: string | null;
  gender: "male" | "female";
  type: string;
  standing: string;
  birth_date: string;
  baptism_date: string;
  other_sheep: boolean;
  anointed: boolean;
}

export interface MonthReport {
  month_name: string;
  active: boolean;
  bible_studies: number | null;
  auxiliary_pioneer: boolean;
  hours: number | null;
  comments: string | null;
}

export interface ServiceYearReportData {
  service_year: string;
  months: MonthReport[];
  total_hours: number;
}
