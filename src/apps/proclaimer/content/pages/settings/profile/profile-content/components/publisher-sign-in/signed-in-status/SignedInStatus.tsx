import type { Session } from "@supabase/supabase-js";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { UpdatePasswordModal } from "../update-password-modal/UpdatePasswordModal";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { Space } from "@ui/components/layout/space/Space";

interface SignedInStatusProps {
  session: Session;
  on_sign_out: () => void;
}

export function SignedInStatus({ session, on_sign_out }: SignedInStatusProps) {
  const handleSignOut = () => {
    void supabase.auth.signOut({ scope: "local" }).then(on_sign_out);
  };

  const has_password = !!session.user.identities?.some((identity) => identity.provider === "email");

  return (
    <>
      <UpdatePasswordModal has_password={has_password} email={session.user.email ?? ""} />
      <Space />
      <TextButton fill="outline" on_click={handleSignOut} label="Sign Out" />
    </>
  );
}
