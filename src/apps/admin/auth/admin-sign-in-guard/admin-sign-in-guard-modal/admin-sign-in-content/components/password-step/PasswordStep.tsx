import { useState } from "react";
import { IonList, IonItem, IonButton, IonNote } from "@ionic/react";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { supabase } from "@util/vendor/supabase/supabase-client";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PasswordStepProps {
  publisher: Publisher;
  onBack: () => void;
  onSignIn: () => void;
}

export function PasswordStep({ publisher, onBack, onSignIn }: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = `${publisher.id}@proclaimer.app`;
  const display_name = publisher.display_name ?? `${publisher.first_name} ${publisher.last_name}`;

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      onSignIn();
    }
  };

  return (
    <>
      <Body color="medium" className="ion-text-center ion-margin">
        Signing in as <strong>{display_name}</strong>
      </Body>
      <Space />
      <IonList inset>
        <PasswordInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          on_change={setPassword}
        />
        {error && (
          <IonItem lines="none">
            <IonNote color="danger" slot="start">
              {error}
            </IonNote>
          </IonItem>
        )}

        <Space />

        <IonButton
          expand="block"
          onClick={() => void handleSignIn()}
          disabled={!password || loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </IonButton>

        <Space />

        <IonButton expand="block" fill="clear" onClick={onBack}>
          Back
        </IonButton>
      </IonList>
    </>
  );
}
