import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonNote,
  IonButton,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { supabase } from "@util/vendor/supabase/supabase-client";

interface PasswordSignInModalProps {
  publisher_id: string;
  onSignIn: () => void;
}

export function PasswordSignInModal({ publisher_id, onSignIn }: PasswordSignInModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = `${publisher_id}@proclaimer.app`;

  const resetState = () => {
    setPassword("");
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      // iOS Safari password save support
      if (
        typeof window !== "undefined" &&
        "PasswordCredential" in window &&
        navigator.credentials
      ) {
        try {
          // Define PasswordCredential interface for TypeScript
          interface PasswordCredentialData {
            id: string;
            password: string;
            name: string;
          }

          interface PasswordCredential {
            id: string;
            password: string;
            name: string;
            type: string;
          }

          interface PasswordCredentialConstructor {
            new (data: PasswordCredentialData): PasswordCredential;
          }

          const PasswordCredentialClass = (window as Record<string, unknown>)
            .PasswordCredential as PasswordCredentialConstructor;
          const credential = new PasswordCredentialClass({
            id: email,
            password: password,
            name: email,
          });
          await navigator.credentials.store(credential);
        } catch {
          // Fallback for browsers that don't support Credential Management API
          console.log("Credential Management API not supported");
        }
      }
      handleClose();
      onSignIn();
    }
  };

  return (
    <>
      <TextButton on_click={() => setIsOpen(true)} label="Sign In with Password" />
      <ResponsiveModal isOpen={isOpen} onIonModalDidDismiss={handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign In with Password</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton skip_confirmation on_click={handleClose} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSignIn();
            }}
            autoComplete="on"
          >
            <input
              type="email"
              name="username"
              value={email}
              readOnly
              autoComplete="username"
              style={{ display: "none" }}
            />
            <IonList inset>
              <PasswordInput
                label="Password"
                value={password}
                placeholder="Enter your password"
                on_change={setPassword}
                disabled={loading}
                autocomplete="current-password"
              />
              {error && (
                <IonItem lines="none">
                  <IonNote color="danger" slot="start">
                    {error}
                  </IonNote>
                </IonItem>
              )}
            </IonList>
            <Space />
            <IonButton
              expand="block"
              type="submit"
              className="ion-margin-horizontal"
              style={{ maxWidth: 360, marginInline: "auto" }}
              disabled={!password || loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </IonButton>
          </form>
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
