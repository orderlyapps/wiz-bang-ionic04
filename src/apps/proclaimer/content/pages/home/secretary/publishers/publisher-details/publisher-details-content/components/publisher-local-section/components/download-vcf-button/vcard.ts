interface VcardPhone {
  number: string;
  label: string;
}

interface VcardEmail {
  address: string;
  label: string;
}

interface VcardAddress {
  label: string;
  unit_number?: string;
  house_number?: string;
  street?: string;
  suburb?: string;
}

interface VcardData {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  display_name?: string | null;
  birth_date?: string;
  baptism_date?: string;
  phone: VcardPhone[];
  email: VcardEmail[];
  address: VcardAddress[];
}

const PHONE_TYPE_MAP: Record<string, string> = {
  Mobile: "CELL",
  Home: "HOME",
  Work: "WORK",
};

const EMAIL_TYPE_MAP: Record<string, string> = {
  Personal: "HOME",
  JWPub: "HOME",
  Work: "WORK",
  Other: "OTHER",
};

const ADDRESS_TYPE_MAP: Record<string, string> = {
  Home: "HOME",
  Work: "WORK",
  Other: "OTHER",
};

function escapeVcard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function generateVcard(data: VcardData): string {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  const first = data.display_name ?? data.first_name;
  lines.push(
    `N:${escapeVcard(data.last_name)};${escapeVcard(first)};${escapeVcard(data.middle_name ?? "")};;`,
  );
  lines.push(`FN:${escapeVcard(`${first} ${data.last_name}`)}`);

  for (const phone of data.phone) {
    const type = PHONE_TYPE_MAP[phone.label] ?? "OTHER";
    lines.push(`TEL;TYPE=${type}:${phone.number}`);
  }

  for (const email of data.email) {
    const type = EMAIL_TYPE_MAP[email.label] ?? "OTHER";
    lines.push(`EMAIL;TYPE=INTERNET;TYPE=${type}:${email.address}`);
  }

  for (const addr of data.address) {
    const type = ADDRESS_TYPE_MAP[addr.label] ?? "HOME";
    const numberPart =
      addr.unit_number && addr.house_number
        ? `${addr.unit_number}/${addr.house_number}`
        : addr.unit_number || addr.house_number || "";
    const streetPart = [numberPart, addr.street].filter(Boolean).join(" ");
    lines.push(
      `ADR;TYPE=${type}:;;${escapeVcard(streetPart)};${escapeVcard(addr.suburb ?? "")};;;`,
    );
  }

  if (data.birth_date) {
    lines.push(`BDAY:${data.birth_date}`);
  }
  if (data.baptism_date) {
    lines.push(`X-BAPTISM-DATE:${data.baptism_date}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function downloadVcard(filename: string, vcard: string): void {
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
