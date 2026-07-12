import { useState, useEffect, useCallback } from "react";
import { AdminSignInGuardModal } from "./admin-sign-in-guard-modal/AdminSignInGuardModal";
import { supabase } from "@util/vendor/supabase/supabase-client";

export function AdminSignInGuard() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setShowModal(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowModal(!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleDismiss = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setShowModal(false);
    }
  }, []);

  return <AdminSignInGuardModal isOpen={showModal} onDismiss={handleDismiss} />;
}
