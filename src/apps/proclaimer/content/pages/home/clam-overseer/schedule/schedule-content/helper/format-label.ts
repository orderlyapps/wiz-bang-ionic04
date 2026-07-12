export function formatLabel(title: string, time: number | null | undefined): string {
  if (time) {
    return `${title} (${time} min)`;
  }
  return title;
}
