import { useIonAlert } from "@ionic/react";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { useFetchLatestOtp } from "./useFetchLatestOtp";

interface GenerateOptions {
  publisherId: string;
  asAdmin?: boolean;
}

export function useGeneratePublisherOtp() {
  const [presentAlert] = useIonAlert();
  const session = useAuthSession();
  const { fetchLatestOtp } = useFetchLatestOtp();

  const generate = async ({ publisherId, asAdmin }: GenerateOptions): Promise<string | null> => {
    const email = `${publisherId}@proclaimer.app`;

    const sixtySecondsAgo = new Date(Date.now() - 60_000).toISOString();
    const { data: existing } = await supabase
      .from("auth_otp_log")
      .select("*")
      .eq("email", email)
      .gte("created_at", sixtySecondsAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return existing.otp;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (error) {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
      return null;
    }

    try {
      return await fetchLatestOtp(email, {
        stampAsAdmin: asAdmin,
        adminUserId: session?.user.id,
      });
    } catch (e) {
      presentAlert({
        header: "Error",
        message: (e as Error).message,
        buttons: ["OK"],
      });
      return null;
    }
  };

  return { generate };
}
