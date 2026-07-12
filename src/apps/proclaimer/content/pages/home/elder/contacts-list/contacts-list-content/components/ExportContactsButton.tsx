import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonButton,
} from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import type React from "react";
import { ContactsPdfDocument } from "./ContactsPdfDocument";
import type { ContactWithDetails } from "../hooks/useContactsForExport";
import { useState } from "react";
import { Space } from "@ui/components/layout/space/Space";

/**
 * Props for the ExportContactsButton component
 */
interface ExportContactsButtonProps {
  /** Array of contacts with their contact information */
  contacts: ContactWithDetails[];
  /** Whether the data is currently loading */
  isLoading?: boolean;
  /** Any error that occurred while fetching data */
  error?: Error | null;
  /** Custom title for the PDF document */
  title?: string;
  /** Custom subtitle for the PDF document */
  subtitle?: string;
  /** Filename for the downloaded PDF (without .pdf extension) */
  filename?: string;
}

/**
 * A self-contained component that provides PDF export functionality for elder contact information.
 * Combines the PDF document generation with a download button and handles loading/error states.
 */
export const ExportContactsButton: React.FC<ExportContactsButtonProps> = ({
  contacts,
  isLoading = false,
  error = null,
  title = "Elder Contact List",
  subtitle,
  filename = "elder-contact-list",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (contacts.length === 0) return;

    setIsGenerating(true);

    try {
      const pdfDocument = (
        <ContactsPdfDocument contacts={contacts} title={title} subtitle={subtitle} />
      );

      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  // If there's an error, show an error message
  if (error) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Error</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Unable to load contact data for export: {error.message}</p>
        </IonCardContent>
      </IonCard>
    );
  }

  // If data is loading, show a loading state
  if (isLoading) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Contacts</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IonSpinner name="crescent" />
            <span>Loading contact data...</span>
          </div>
        </IonCardContent>
      </IonCard>
    );
  }

  // If no contacts found, show empty state
  if (contacts.length === 0) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Contacts</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>No records found to export.</p>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <>
      <Space size="2xl" />
      <IonButton
        expand="block"
        fill="outline"
        onClick={handleDownload}
        disabled={isGenerating}
        className="ion-margin"
      >
        {isGenerating ? (
          <>
            <IonSpinner name="crescent" style={{ marginRight: "8px" }} />
            Generating PDF...
          </>
        ) : (
          `Export ${contacts.length} Records to PDF`
        )}
      </IonButton>
    </>
  );
};
