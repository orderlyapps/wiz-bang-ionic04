import { supabase } from "@util/vendor/supabase/supabase-client";

export function useFetchLatestOtp() {
  const fetchLatestOtp = async (
    email: string,
    options?: { stampAsAdmin?: boolean; adminUserId?: string },
  ): Promise<string> => {
    const deadline = Date.now() + 5000;

    while (Date.now() < deadline) {
      const { data, error } = await supabase
        .from("auth_otp_log")
        .select("*")
        .eq("email", email)
        .is("used_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw new Error(error.message);

      if (data) {
        const patch: Record<string, string> = { used_at: new Date().toISOString() };
        if (options?.stampAsAdmin && options.adminUserId) {
          patch.sent_by_admin_at = new Date().toISOString();
          patch.sent_by_admin_id = options.adminUserId;
        }
        await supabase.from("auth_otp_log").update(patch).eq("id", data.id);
        return data.otp;
      }

      await new Promise((r) => setTimeout(r, 400));
    }

    throw new Error("Timed out waiting for OTP. Try again.");
  };

  return { fetchLatestOtp };
}
