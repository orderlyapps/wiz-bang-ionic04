import { useState, useEffect, useRef } from "react";
import { IonList, IonItem, IonButton, IonNote } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { OtpInput } from "@ui/components/inputs/otp/OtpInput";
import { supabase } from "@util/vendor/supabase/supabase-client";

interface OtpSignInProps {
  email: string;
  onSignIn: () => void;
  onCancel: () => void;
}

export function OtpSignIn({ email, onSignIn, onCancel }: OtpSignInProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const otpSentRef = useRef(false);

  useEffect(() => {
    if (otpSentRef.current) return;
    otpSentRef.current = true;

    const sendOtp = async () => {
      setLoading(true);
      setError(null);
      const { error: sendError } = await supabase.auth.signInWithOtp({ email });
      setLoading(false);
      if (sendError) {
        setError(sendError.message);
      }
    };

    void sendOtp();
  }, [email]);

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    setLoading(false);
    if (verifyError) {
      setError(verifyError.message);
    } else {
      onSignIn();
    }
  };

  return (
    <>
      <Body color="medium" className="ion-text-center ion-margin">
        Enter the OTP sent to <strong>{email}</strong>
      </Body>
      <Space />
      <IonList inset>
        <IonItem>
          <div style={{ padding: "16px 0" }}>
            <OtpInput value={otp} on_change={setOtp} disabled={loading} />
          </div>
        </IonItem>
        {error && (
          <IonItem lines="none">
            <IonNote color="danger" slot="start">
              {error}
            </IonNote>
          </IonItem>
        )}
      </IonList>
      <Space />
      <div className="ion-margin ion-padding-horizontal">
        <IonButton expand="block" onClick={() => void handleVerifyOtp()} disabled={!otp || loading}>
          {loading ? "Verifying…" : "Verify OTP"}
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={onCancel}>
          Cancel
        </IonButton>
      </div>
    </>
  );
}
