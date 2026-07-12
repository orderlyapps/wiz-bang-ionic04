import { supabase } from "@util/vendor/supabase/supabase-client";
import { publisherCollection } from "@shared/database/collections/publisher";
import { authUserCollection } from "@shared/database/collections/auth-user";

export function useCreatePublisherAuthUser() {
  const createAuthUser = async (publisherId: string): Promise<string> => {
    const { data, error } = await supabase.rpc("create_publisher_auth_user", {
      p_publisher_id: publisherId,
    });

    if (error) {
      throw new Error(error.message);
    }

    await Promise.all([publisherCollection.utils.refetch(), authUserCollection.utils.refetch()]);

    return data as string;
  };

  return { createAuthUser };
}
