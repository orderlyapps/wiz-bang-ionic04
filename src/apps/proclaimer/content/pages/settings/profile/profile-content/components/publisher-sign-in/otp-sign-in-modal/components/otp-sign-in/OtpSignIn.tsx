import { useState, useEffect, useRef } from "react";
import { IonList, IonItem, IonNote, IonSpinner } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { OtpInput } from "@ui/components/inputs/otp/OtpInput";
import { supabase } from "@util/vendor/supabase/supabase-client";

const OTP_LENGTH = 6;

interface OtpSignInProps {
  email: string;
  onSignIn: () => void;
}

export function OtpSignIn({ email, onSignIn }: OtpSignInProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const otpSentRef = useRef(false);
  const verifyingRef = useRef(false);
  const onSignInRef = useRef(onSignIn);
  onSignInRef.current = onSignIn;

  useEffect(() => {
    if (otpSentRef.current) return;
    otpSentRef.current = true;

    const sendOtp = async () => {
      setLoading(true);
      setError(null);
      const { error: sendError } = await supabase.auth.signInWithOtp({ email });
      setLoading(false);
      if (sendError) setError(sendError.message);
    };

    void sendOtp();
  }, [email]);

  const handle_complete = async (completed_otp: string) => {
    if (verifyingRef.current) return;
    verifyingRef.current = true;

    setLoading(true);
    setError(null);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: completed_otp,
      type: "email",
    });
    setLoading(false);
    verifyingRef.current = false;
    if (verifyError) {
      setError(verifyError.message);
      setOtp("");
    } else {
      onSignInRef.current();
    }
  };

  return (
    <div className="flex-center">
      <IonList inset lines="none">
        <IonItem>
          <Body color="medium" className="ion-text-center ion-margin" balance>
            Please enter your six digit code below to sign in.
          </Body>
        </IonItem>

        <IonItem>
          <OtpInput
            value={otp}
            on_change={setOtp}
            on_complete={handle_complete}
            length={OTP_LENGTH}
            disabled={loading}
          />
        </IonItem>

        {loading && (
          <IonItem lines="none" className="ion-justify-content-center">
            <IonSpinner slot="start" />
            <IonNote color="medium">Signing in...</IonNote>
          </IonItem>
        )}

        {error && (
          <>
            <Space size="sm" />
            <IonItem lines="none">
              <IonNote color="danger" slot="start">
                {error}
              </IonNote>
            </IonItem>
          </>
        )}

        <Space size="sm" />
      </IonList>
    </div>
  );
}
