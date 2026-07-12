import { ExportContactsButton } from "./components/ExportContactsButton";
import { useContactsForExport } from "./hooks/useContactsForExport";

export function ContactsListContent() {
  const { data: contacts, isLoading, error } = useContactsForExport();

  return (
    <>
      <ExportContactsButton contacts={contacts} isLoading={isLoading} error={error} />
    </>
  );
}
