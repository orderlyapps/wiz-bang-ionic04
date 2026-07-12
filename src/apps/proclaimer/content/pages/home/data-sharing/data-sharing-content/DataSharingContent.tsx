import { useState } from "react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { SendModal } from "./components/send-modal/SendModal";
import { ReceiveModal } from "./components/receive-modal/ReceiveModal";
import { ExportModal } from "./components/export-modal/ExportModal";
import { ImportModal } from "./components/import-modal/ImportModal";

export function DataSharingContent() {
  const [send_open, setSendOpen] = useState(false);
  const [receive_open, setReceiveOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <TextButton label="Send" on_click={() => setSendOpen(true)} />
      <Space />
      <TextButton label="Receive" on_click={() => setReceiveOpen(true)} />
      <Space />
      <TextButton label="Export" on_click={() => setExportOpen(true)} />
      <Space />
      <TextButton label="Import" on_click={() => setImportOpen(true)} />
      <SendModal is_open={send_open} onClose={() => setSendOpen(false)} />
      <ReceiveModal is_open={receive_open} onClose={() => setReceiveOpen(false)} />
      <ExportModal is_open={exportOpen} onClose={() => setExportOpen(false)} />
      <ImportModal is_open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}
