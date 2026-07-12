import { supabase } from "@util/vendor/supabase/supabase-client";

const DEVICE_ID_KEY = "wiz-bang-device-id";
const DEVICE_NAME_KEY = "wiz-bang-device-name";

function generateDeviceId(): string {
  return crypto.randomUUID();
}

function readStoredDeviceId(): string | null {
  try {
    return localStorage.getItem(DEVICE_ID_KEY);
  } catch {
    return null;
  }
}

function writeStoredDeviceId(device_id: string): void {
  try {
    localStorage.setItem(DEVICE_ID_KEY, device_id);
  } catch {
    // Ignore storage failures (e.g., private browsing).
  }
}

function readStoredDeviceName(): string | null {
  try {
    return localStorage.getItem(DEVICE_NAME_KEY);
  } catch {
    return null;
  }
}

function writeStoredDeviceName(device_name: string): void {
  try {
    localStorage.setItem(DEVICE_NAME_KEY, device_name);
  } catch {
    // Ignore storage failures.
  }
}

function defaultDeviceName(): string {
  const platform = navigator.platform ?? "Device";
  const browser = navigator.userAgent.split(" ").pop() ?? "browser";
  return `${platform} ${browser}`.trim();
}

/**
 * Returns the stable device id for this browser/device, creating and persisting
 * one if it does not yet exist.
 */
export function getDeviceId(): string {
  const existing = readStoredDeviceId();
  if (existing) return existing;

  const device_id = generateDeviceId();
  writeStoredDeviceId(device_id);
  return device_id;
}

/**
 * Returns the user-visible device name, falling back to a default based on the
 * user agent if none has been set.
 */
export function getDeviceName(): string {
  return readStoredDeviceName() ?? defaultDeviceName();
}

/**
 * Override the displayed device name.
 */
export function setDeviceName(device_name: string): void {
  writeStoredDeviceName(device_name);
}

/**
 * Register or refresh this device in Supabase. Should be called once the user
 * is authenticated so the device can be trusted by peers and attached to share
 * sessions.
 */
export async function registerDevice(): Promise<void> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) return;

  const device_id = getDeviceId();
  const device_name = getDeviceName();

  const { error } = await supabase.from("device").upsert(
    {
      id: device_id,
      user_id: user.data.user.id,
      device_name,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) throw error;
}

/**
 * Clear the locally stored device identity. Used for sign-out/reset flows.
 */
export function clearDeviceId(): void {
  try {
    localStorage.removeItem(DEVICE_ID_KEY);
    localStorage.removeItem(DEVICE_NAME_KEY);
  } catch {
    // Ignore storage failures.
  }
}
