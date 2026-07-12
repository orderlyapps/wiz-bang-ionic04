import { OtpSignInModal } from "./otp-sign-in-modal/OtpSignInModal";
import { PasswordSignInModal } from "./password-sign-in-modal/PasswordSignInModal";
import { SignedInStatus } from "./signed-in-status/SignedInStatus";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Space } from "@ui/components/layout/space/Space";

interface PublisherSignInProps {
  publisher: Publisher | null;
}

export function PublisherSignIn({ publisher }: PublisherSignInProps) {
  const session = useAuthSession();

  if (!publisher) return null;
  if (session === undefined) return null;

  const is_signed_in = !!session;

  if (is_signed_in) {
    return <SignedInStatus session={session} on_sign_out={() => {}} />;
  }

  return (
    <>
      <OtpSignInModal publisher_id={publisher.id ?? ""} onSignIn={() => {}} />
      <Space />
      <PasswordSignInModal publisher_id={publisher.id ?? ""} onSignIn={() => {}} />
    </>
  );
}
