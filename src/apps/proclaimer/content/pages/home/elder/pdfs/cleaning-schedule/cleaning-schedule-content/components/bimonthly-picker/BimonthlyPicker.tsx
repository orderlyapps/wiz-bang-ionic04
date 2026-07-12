import { Select } from "@ui/components/inputs/select/Select";
import { format } from "date-fns";

type BimonthlyRange = {
  readonly firstMonday: string;
  readonly lastMonday: string;
};

type BimonthlyPickerProps = {
  readonly value?: string;
  readonly onValueChange?: (value: BimonthlyRange) => void;
  readonly label?: string;
};

function getFirstMondayOfMonth(year: number, month: number): Date {
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const offsetToMonday = (8 - dayOfWeek) % 7;
  return new Date(year, month, 1 + offsetToMonday);
}

function getLastMondayOfMonth(year: number, month: number): Date {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dayOfWeek = lastDayOfMonth.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return new Date(year, month, lastDayOfMonth.getDate() - daysToSubtract);
}

function formatDateToYyyyMmDd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type BimonthlyOption = {
  readonly value: string;
  readonly label: string;
  readonly range: BimonthlyRange;
};

function getBimonthlyOptions(): BimonthlyOption[] {
  const now = new Date();
  const currentPairIndex = Math.floor(now.getMonth() / 2);
  const options: BimonthlyOption[] = [];

  for (let i = 0; i < 2; i++) {
    const pairIndex = currentPairIndex + i;
    const year = now.getFullYear() + Math.floor(pairIndex / 6);
    const monthIndex = (pairIndex % 6) * 2;

    const firstMonday = getFirstMondayOfMonth(year, monthIndex);
    const lastMonday = getLastMondayOfMonth(year, monthIndex + 1);

    const firstMonthName = format(new Date(year, monthIndex, 1), "MMM");
    const secondMonthName = format(new Date(year, monthIndex + 1, 1), "MMM");
    const yearSuffix = format(new Date(year, monthIndex, 1), " yyyy");

    const value = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const label = `${firstMonthName} – ${secondMonthName}${yearSuffix}${i === 0 ? " (Current)" : " (Next)"}`;

    options.push({
      value,
      label,
      range: {
        firstMonday: formatDateToYyyyMmDd(firstMonday),
        lastMonday: formatDateToYyyyMmDd(lastMonday),
      },
    });
  }

  return options;
}

export function BimonthlyPicker({ value, onValueChange, label }: BimonthlyPickerProps) {
  const options = getBimonthlyOptions();

  const handleChange = (selectedValue: string | string[] | null) => {
    if (!selectedValue || Array.isArray(selectedValue)) return;
    const option = options.find((o) => o.value === selectedValue);
    if (option) {
      onValueChange?.(option.range);
    }
  };

  const selectOptions = options.map(({ value, label }) => ({ value, label }));

  return (
    <Select
      label={label ?? "Select Period"}
      value={value ?? null}
      options={selectOptions}
      on_change={handleChange}
      interface_type="popover"
      placeholder="Select bimonthly period"
    />
  );
}
