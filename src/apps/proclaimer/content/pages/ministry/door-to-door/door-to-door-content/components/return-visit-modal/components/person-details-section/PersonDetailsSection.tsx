import { IonItem, IonLabel, IonText } from "@ionic/react";

type PersonDetailsSectionProps = {
  first_name: string;
  last_name: string;
  phone_number: string;
  notes: string;
};

export function PersonDetailsSection({
  first_name,
  last_name,
  phone_number,
  notes,
}: PersonDetailsSectionProps) {
  const fullName = [first_name, last_name].filter(Boolean).join(" ");
  const hasAny = fullName || phone_number || notes;

  if (!hasAny) return null;

  return (
    <IonItem lines="full">
      <IonLabel>
        {fullName && <h3>{fullName}</h3>}
        {phone_number && (
          <IonText color="medium">
            <p>{phone_number}</p>
          </IonText>
        )}
        {notes && (
          <IonText color="medium">
            <p>{notes}</p>
          </IonText>
        )}
      </IonLabel>
    </IonItem>
  );
}
