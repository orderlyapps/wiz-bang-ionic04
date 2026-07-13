import { useLiveQuery } from "@tanstack/react-db";
import { settingsLocalCollection } from "@shared/database/collections/settings-local";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { getServiceYear } from "@util/format/service-year";

const FEATURE = "ministry_time";
const REGULAR_PIONEER_KEY = "regular_pioneer_yearly_hours";
export const DEFAULT_REGULAR_PIONEER_YEARLY_HOURS = 600;

function versionData() {
  const now = Date.now();
  return {
    created_by: "",
    updated_by: "",
    created_at: now,
    updated_at: now,
  };
}

export interface PioneerHoursSetting {
  setting_id: string;
  service_year: string;
  hours: number;
}

export function usePioneerSettings() {
  const { data } = useLiveQuery((q) =>
    q.from({ s: settingsLocalCollection }).orderBy(({ s }) => s.service_year),
  );

  const allSettings = (data as Record<string, unknown>[] | undefined) ?? [];
  const settings = allSettings
    .filter((row) => row.feature === FEATURE && row.key === REGULAR_PIONEER_KEY)
    .map(
      (row): PioneerHoursSetting => ({
        setting_id: row.setting_id as string,
        service_year: (row.service_year as string) ?? "",
        hours: parseInt(row.value as string, 10),
      }),
    );

  function getHoursForServiceYear(serviceYear: string): number {
    const setting = settings.find((s) => s.service_year === serviceYear);
    return setting?.hours ?? DEFAULT_REGULAR_PIONEER_YEARLY_HOURS;
  }

  function getCurrentServiceYearHours(): number {
    return getHoursForServiceYear(getServiceYear(new Date()));
  }

  function setPioneerHours(serviceYear: string, hours: number) {
    const settingId = makeCompositeKey(FEATURE, REGULAR_PIONEER_KEY, serviceYear);
    const existing = settings.find((s) => s.service_year === serviceYear);

    if (existing) {
      settingsLocalCollection.update(settingId, (draft) => {
        draft.value = String(hours);
        draft.version.updated_at = Date.now();
      });
    } else {
      settingsLocalCollection.insert({
        setting_id: settingId,
        feature: FEATURE,
        key: REGULAR_PIONEER_KEY,
        value: String(hours),
        service_year: serviceYear,
        version: versionData(),
      });
    }
  }

  return {
    settings,
    getHoursForServiceYear,
    getCurrentServiceYearHours,
    setPioneerHours,
  };
}
