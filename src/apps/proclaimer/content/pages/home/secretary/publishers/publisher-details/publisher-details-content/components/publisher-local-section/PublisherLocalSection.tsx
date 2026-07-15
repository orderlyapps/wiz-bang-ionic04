import { useLiveQuery, eq } from "@tanstack/react-db";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Space } from "@ui/components/layout/space/Space";
import { PhoneList } from "./components/phone-list/PhoneList";
import { AddressList } from "./components/address-list/AddressList";
import { EmailList } from "./components/email-list/EmailList";
import { EmergencyContactList } from "./components/emergency-contact-list/EmergencyContactList";
import { DownloadVcardButton } from "./components/download-vcf-button/DownloadVcardButton";
import { getYearsMonthsSince } from "@proclaimer-shared/util/date/getYearsMonthsSince";

interface Props {
  publisher_id: string;
  read_only?: boolean;
}

export function PublisherLocalSection({ publisher_id, read_only = false }: Props) {
  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).where(({ p }) => eq(p.publisher_id, publisher_id)),
  );

  const local = data?.[0];

  if (!local) {
    if (read_only) return null;
    return (
      <>
        <Space />
        <IonItem
          button
          detail={false}
          onClick={() =>
            publisherLocalCollection.insert({
              publisher_id,
              confidential_id: crypto.randomUUID(),
              phone: [],
              address: [],
              email: [],
              emergency_contact: [],
              birth_date: "",
              baptism_date: "",
              version: {
                created_by: "",
                updated_by: "",
                created_at: Date.now(),
                updated_at: Date.now(),
              },
            })
          }
        >
          <IonIcon icon={addCircleOutline} slot="start" color="primary" />
          <IonLabel>Add Contact Information</IonLabel>
        </IonItem>
      </>
    );
  }

  return (
    <>
      <>
        {read_only ? (
          <>
            <LabelValueItem
              label="Date of Birth"
              value={
                local.birth_date
                  ? new Date(local.birth_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""
              }
              value_2={local.birth_date ? getYearsMonthsSince(local.birth_date) : undefined}
              value_2_color="medium"
            />
            <LabelValueItem
              label="Baptism Date"
              value={
                local.baptism_date
                  ? new Date(local.baptism_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""
              }
              value_2={
                local.baptism_date
                  ? `${getYearsMonthsSince(local.baptism_date)}${
                      local.birth_date
                        ? ` (Age: ${getYearsMonthsSince(local.birth_date, local.baptism_date)})`
                        : ""
                    }`
                  : undefined
              }
              value_2_color="medium"
            />
          </>
        ) : (
          <>
            <DateInput
              label="Date of Birth"
              value={local.birth_date ?? ""}
              on_change={(value) =>
                publisherLocalCollection.update(publisher_id, (draft) => {
                  draft.birth_date = value;
                })
              }
            />
            <DateInput
              label="Baptism Date"
              value={local.baptism_date ?? ""}
              on_change={(value) =>
                publisherLocalCollection.update(publisher_id, (draft) => {
                  draft.baptism_date = value;
                })
              }
            />
          </>
        )}
      </>
      <PhoneList publisher_id={publisher_id} phone={local.phone ?? []} read_only={read_only} />
      <AddressList
        publisher_id={publisher_id}
        address={local.address ?? []}
        read_only={read_only}
      />
      <EmailList publisher_id={publisher_id} email={local.email ?? []} read_only={read_only} />
      <EmergencyContactList
        publisher_id={publisher_id}
        emergency_contact={local.emergency_contact ?? []}
        read_only={read_only}
      />
      <Space />
      <DownloadVcardButton publisher_id={publisher_id} />
    </>
  );
}
