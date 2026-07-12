import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [is_online, set_is_online] = useState(() => navigator.onLine);

  useEffect(() => {
    const handle_online = () => set_is_online(true);
    const handle_offline = () => set_is_online(false);

    window.addEventListener("online", handle_online);
    window.addEventListener("offline", handle_offline);

    return () => {
      window.removeEventListener("online", handle_online);
      window.removeEventListener("offline", handle_offline);
    };
  }, []);

  return { is_online };
}
