import { useState, useEffect } from "react";
import { supabase } from "@util/vendor/supabase/supabase-client";
import type { Publisher } from "@shared/database/schemas/publisher";
import { PublisherSelectStep } from "./components/publisher-select-step/PublisherSelectStep";

interface AdminSignInContentProps {
  onSignIn: () => void;
}

export function AdminSignInContent({ onSignIn }: AdminSignInContentProps) {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: auth_users } = await supabase
        .from("auth_user")
        .select("auth_user_id")
        .eq("is_super_admin", true);

      const super_admin_ids = (auth_users ?? []).map((u) => u.auth_user_id);

      if (super_admin_ids.length === 0) {
        setPublishers([]);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("publisher")
        .select("*")
        .in("auth_id", super_admin_ids)
        .order("last_name");

      setPublishers((data ?? []) as Publisher[]);
      setIsLoading(false);
    })();
  }, []);

  return <PublisherSelectStep publishers={publishers} isLoading={isLoading} onSignIn={onSignIn} />;
}
