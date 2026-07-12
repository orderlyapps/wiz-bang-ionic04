import { useState } from "react";
import { IonItem, IonLabel, IonList, IonToggle, useIonAlert, useIonToast } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useCreatePublisherAuthUser } from "./hooks/useCreatePublisherAuthUser";
import { useGeneratePublisherOtp } from "./hooks/useGeneratePublisherOtp";
import { usePublisherPhoneLookup } from "./hooks/usePublisherPhone";
import { OtpDisplayModal } from "./components/otp-display-modal/OtpDisplayModal";

export function AuthUsersContent() {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { createAuthUser } = useCreatePublisherAuthUser();
  const { generate } = useGeneratePublisherOtp();
  const phoneFor = usePublisherPhoneLookup();

  const [otp, setOtp] = useState<string | null>(null);
  const [smsPhone, setSmsPhone] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeOnly, setActiveOnly] = useState<boolean>(() => {
    try {
      return localStorage.getItem(localStorageKeys.authUsersActiveOnly) === "true";
    } catch {
      return false;
    }
  });

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const sorted = (publishers?.filter((p) => !p.archived_at) ?? []).filter(
    (p) => !activeOnly || !!p.auth_id,
  );

  const handleSelect = (publisherId: string, name: string, hasAuth: boolean) => {
    if (!hasAuth) {
      void presentAlert({
        header: "Create auth user?",
        message: `This will create a passwordless account for ${name}.`,
        buttons: [
          { text: "Cancel", role: "cancel" },
          {
            text: "Create",
            handler: async () => {
              try {
                await createAuthUser(publisherId);
                void presentToast({
                  message: `Auth user created for ${name}`,
                  duration: 2000,
                  color: "success",
                });
              } catch (err) {
                void presentToast({
                  message: `Error: ${(err as Error).message}`,
                  duration: 4000,
                  color: "danger",
                });
              }
            },
          },
        ],
      });
    } else {
      void handleGenerateOtp(publisherId);
    }
  };

  const handleGenerateOtp = async (publisherId: string) => {
    const code = await generate({ publisherId, asAdmin: true });
    if (code) {
      setOtp(code);
      setSmsPhone(phoneFor(publisherId));
      setModalOpen(true);
    }
  };

  const toggleActiveOnly = (checked: boolean) => {
    setActiveOnly(checked);
    try {
      localStorage.setItem(localStorageKeys.authUsersActiveOnly, String(checked));
    } catch {
      // Silently fail if localStorage is not available
    }
  };

  return (
    <>
      <IonList>
        <IonItem>
          <IonLabel>Active only</IonLabel>
          <IonToggle
            checked={activeOnly}
            onIonChange={(e) => toggleActiveOnly(e.detail.checked)}
            slot="end"
          />
        </IonItem>
        {sorted.map((p) => (
          <IonItem
            key={p.id}
            button
            detail
            onClick={() => handleSelect(p.id ?? "", getPublisherDisplayName(p), !!p.auth_id)}
          >
            <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
            {p.auth_id && (
              <IonLabel slot="end" color="success">
                Active
              </IonLabel>
            )}
          </IonItem>
        ))}
      </IonList>
      <OtpDisplayModal
        isOpen={modalOpen}
        otp={otp}
        smsPhone={smsPhone}
        onDismiss={() => {
          setModalOpen(false);
          setOtp(null);
          setSmsPhone(null);
        }}
      />
    </>
  );
}
