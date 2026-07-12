import { IonItem, IonLabel, IonList, IonIcon, IonSkeletonText, IonAlert } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useState } from "react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { useLiveQuery, isNull } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import type { Congregation } from "@shared/database/schemas/congregation";
import { setStoredCongregation, getStoredCongregation } from "@util/app/congregation/utils";

interface CongregationSelectContentProps {
  onSelect?: () => void;
}

export function CongregationSelectContent({ onSelect }: CongregationSelectContentProps) {
  const { data, isLoading } = useLiveQuery((q) =>
    q
      .from({ c: congregationCollection })
      .where(({ c }) => isNull(c.congregation_id))
      .orderBy(({ c }) => c.name),
  );

  const [passwordAlert, setPasswordAlert] = useState<{
    is_open: boolean;
    congregation: Congregation | null;
    error_message?: string;
  }>({ is_open: false, congregation: null });

  const selected_id = getStoredCongregation()?.id;

  const handleSelect = (congregation: Congregation) => {
    if (congregation.password) {
      setPasswordAlert({ is_open: true, congregation, error_message: undefined });
      return;
    }
    confirmSelection(congregation);
  };

  const confirmSelection = (congregation: Congregation) => {
    setStoredCongregation(congregation);
    onSelect?.();
  };

  const handlePasswordSubmit = (data: { [key: string]: string }) => {
    const entered_password = data.password;
    const congregation = passwordAlert.congregation;

    if (!congregation) return false;

    if (entered_password === congregation.password) {
      setPasswordAlert({ is_open: false, congregation: null });
      confirmSelection(congregation);
      return true;
    } else {
      setPasswordAlert({
        is_open: true,
        congregation,
        error_message: "Incorrect password. Please try again.",
      });
      return false;
    }
  };

  if (isLoading) {
    return (
      <IonList inset>
        {[1, 2, 3].map((i) => (
          <IonItem key={i}>
            <IonLabel>
              <IonSkeletonText style={{ width: "50%" }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }

  if (!data || data.length === 0) {
    return (
      <IonList inset>
        <IonItem>
          <IonLabel>No congregations available.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <>
      <IonList className="ion-margin" inset>
        <MultiColumnList<Congregation>
          items={data}
          get_id={(c) => c.id ?? ""}
          gap="sm"
          render_item={(c) => {
            const is_selected = selected_id === c.id;
            return (
              <IonItem onClick={() => handleSelect(c)}>
                <IonLabel className="ion-margin-start ion-padding-start">{c.name}</IonLabel>
                {is_selected && <IonIcon icon={checkmark} slot="end" color="primary" />}
              </IonItem>
            );
          }}
        />
      </IonList>
      <IonAlert
        isOpen={passwordAlert.is_open}
        onDidDismiss={() => setPasswordAlert({ is_open: false, congregation: null })}
        header={`Enter the Zoom Meeting password for ${passwordAlert.congregation?.name} Congregation`}
        message={passwordAlert.error_message}
        inputs={[
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Confirm", handler: handlePasswordSubmit },
        ]}
      />
    </>
  );
}
