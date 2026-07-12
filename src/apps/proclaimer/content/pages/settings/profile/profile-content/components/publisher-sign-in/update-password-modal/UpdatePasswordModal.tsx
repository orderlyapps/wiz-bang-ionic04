import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { UpdatePasswordForm } from "./components/update-password-form/UpdatePasswordForm";
import { UpdatePasswordSuccess } from "./components/update-password-success/UpdatePasswordSuccess";
import { supabase } from "@util/vendor/supabase/supabase-client";

interface UpdatePasswordModalProps {
  has_password: boolean;
  email: string;
}

export function UpdatePasswordModal({ has_password, email }: UpdatePasswordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const label = has_password ? "Update Password" : "Set Password";

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  const handleSave = async () => {
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
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
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <TextButton fill="outline" on_click={() => setIsOpen(true)} label={label} />
      <ResponsiveModal isOpen={isOpen} onIonModalDidDismiss={handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{label}</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton skip_confirmation on_click={handleClose} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {success ? (
            <UpdatePasswordSuccess on_done={handleClose} />
          ) : (
            <UpdatePasswordForm
              email={email}
              password={password}
              confirm_password={confirmPassword}
              loading={loading}
              error={error}
              on_password_change={setPassword}
              on_confirm_change={setConfirmPassword}
              on_save={() => void handleSave()}
            />
          )}
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
