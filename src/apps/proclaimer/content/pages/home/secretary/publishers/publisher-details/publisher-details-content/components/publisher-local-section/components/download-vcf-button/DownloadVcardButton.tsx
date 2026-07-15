import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { suburbCollection } from "@shared/database/collections/suburb";
import { streetCollection } from "@shared/database/collections/street";
import { generateVcard, downloadVcard } from "./vcard";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function DownloadVcardButton({ publisher_id }: { publisher_id: string }) {
  const { data: publisher_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );
  const { data: local_data } = useLiveQuery((q) =>
    q.from({ pl: publisherLocalCollection }).where(({ pl }) => eq(pl.publisher_id, publisher_id)),
  );
  const { data: suburbs } = useLiveQuery((q) => q.from({ s: suburbCollection }));
  const { data: streets } = useLiveQuery((q) => q.from({ st: streetCollection }));

  const publisher = publisher_data?.[0];
  const local = local_data?.[0];

  if (!publisher || !local) return null;

  function resolveName(value: string | undefined, lookup: { id?: string; name: string }[]): string {
    if (!value) return "";
    if (UUID_RE.test(value)) {
      return lookup.find((s) => s.id === value)?.name ?? value;
    }
    return value;
  }

  function handleDownload() {
    const vcard = generateVcard({
      first_name: publisher!.first_name,
      middle_name: publisher!.middle_name,
      last_name: publisher!.last_name,
      display_name: publisher!.display_name,
      birth_date: local!.birth_date ?? undefined,
      baptism_date: local!.baptism_date ?? undefined,
      phone: (local!.phone ?? []).map((p) => ({ number: p.number, label: p.label })),
      email: (local!.email ?? []).map((e) => ({ address: e.address, label: e.label })),
      address: (local!.address ?? []).map((a) => ({
        label: a.label,
        unit_number: a.unit_number,
        house_number: a.house_number,
        street: resolveName(a.street, streets ?? []),
        suburb: resolveName(a.suburb, suburbs ?? []),
      })),
    });
    const filename = `${publisher!.last_name}_${publisher!.first_name}`;
    downloadVcard(filename, vcard);
  }

  return <TextButton fill="outline" on_click={handleDownload} label="Export vCard" />;
}
