import { useEffect, useState } from "react";
import { Body } from "@ui/components/display/text/body/Body";

interface OtpCountdownProps {
  durationSeconds: number;
  onExpire: () => void;
}

export function OtpCountdown({ durationSeconds, onExpire }: OtpCountdownProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onExpire]);

  return (
    <Body color="medium" className="ion-text-center">
      Hides in {remaining}s
    </Body>
  );
}
