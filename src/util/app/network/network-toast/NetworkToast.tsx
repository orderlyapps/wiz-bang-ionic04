import { IonToast } from "@ionic/react";
import { useNetworkStatus } from "@util/app/network/hooks/use-network-status";
import { useState, useEffect } from "react";

interface NetworkToastProps {
  online_message?: string;
  offline_message?: string;
  duration?: number;
}

export function NetworkToast({
  online_message = "You are back online",
  offline_message = "You are offline",
  duration = 3000,
}: NetworkToastProps) {
  const { is_online } = useNetworkStatus();
  const [is_open, set_is_open] = useState(false);
  const [message, set_message] = useState("");
  const [prev_status, set_prev_status] = useState<boolean | null>(null);

  useEffect(() => {
    if (prev_status !== null && prev_status !== is_online) {
      set_message(is_online ? online_message : offline_message);
      set_is_open(true);
    }
    set_prev_status(is_online);
  }, [is_online, online_message, offline_message, prev_status]);

  return (
    <IonToast
      isOpen={is_open}
      message={message}
      duration={duration}
      onDidDismiss={() => set_is_open(false)}
      color={is_online ? "success" : "warning"}
    />
  );
}
