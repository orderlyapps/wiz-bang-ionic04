import { useEffect, useState } from "react";
import { IonToast } from "@ionic/react";
import { useRegisterSW } from "virtual:pwa-register/react";

const UPDATED_KEY = "pwa_updated";

export function PwaUpdateToast() {
  const [is_open, set_is_open] = useState(() => sessionStorage.getItem(UPDATED_KEY) === "1");

  useRegisterSW({
    onRegisterError(error) {
      console.error("SW registration failed:", error);
    },
  });

  useEffect(() => {
    if (sessionStorage.getItem(UPDATED_KEY) === "1") {
      sessionStorage.removeItem(UPDATED_KEY);
    }

    let refreshing = false;
    const had_controller = !!navigator.serviceWorker?.controller;
    const handler = () => {
      if (refreshing) return;
      if (!had_controller) return;
      refreshing = true;
      sessionStorage.setItem(UPDATED_KEY, "1");
      window.location.reload();
    };
    navigator.serviceWorker?.addEventListener("controllerchange", handler);
    return () => {
      navigator.serviceWorker?.removeEventListener("controllerchange", handler);
    };
  }, []);

  return (
    <IonToast
      isOpen={is_open}
      message="App updated to the latest version."
      duration={3000}
      position="top"
      onDidDismiss={() => set_is_open(false)}
    />
  );
}
