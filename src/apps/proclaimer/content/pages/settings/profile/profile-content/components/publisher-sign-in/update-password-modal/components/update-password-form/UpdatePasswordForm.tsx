import { IonList, IonItem, IonNote, IonButton } from "@ionic/react";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { Space } from "@ui/components/layout/space/Space";

interface UpdatePasswordFormProps {
  email: string;
  password: string;
  confirm_password: string;
  loading: boolean;
  error: string | null;
  on_password_change: (value: string) => void;
  on_confirm_change: (value: string) => void;
  on_save: () => void;
}

export function UpdatePasswordForm({
  email,
  password,
  confirm_password,
  loading,
  error,
  on_password_change,
  on_confirm_change,
  on_save,
}: UpdatePasswordFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        on_save();
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
          label="New password"
          name="new-password"
          id="new-password"
          value={password}
          placeholder="At least 6 characters"
          on_change={on_password_change}
          disabled={loading}
          autocomplete="new-password"
        />
        <PasswordInput
          label="Confirm password"
          name="new-password-confirm"
          value={confirm_password}
          placeholder="Re-enter password"
          on_change={on_confirm_change}
          disabled={loading}
          autocomplete="new-password"
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
        disabled={!password || !confirm_password || loading}
      >
        {loading ? "Saving…" : "Save Password"}
      </IonButton>
    </form>
  );
}
