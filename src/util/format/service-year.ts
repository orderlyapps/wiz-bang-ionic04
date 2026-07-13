export function getServiceYear(date: Date): string {
  const year = date.getFullYear();
  const sep1 = new Date(year, 8, 1);
  return date >= sep1 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

export function getServiceYearStart(serviceYear: string): Date {
  const startYear = parseInt(serviceYear.split("-")[0], 10);
  return new Date(startYear, 8, 1);
}

export function getServiceYearEnd(serviceYear: string): Date {
  const endYear = parseInt(serviceYear.split("-")[1], 10);
  return new Date(endYear, 7, 31);
}
