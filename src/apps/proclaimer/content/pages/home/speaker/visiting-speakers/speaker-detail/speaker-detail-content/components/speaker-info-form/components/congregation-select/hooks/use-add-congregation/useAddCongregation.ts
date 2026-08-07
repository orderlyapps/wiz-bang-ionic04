import { useIonToast } from "@ionic/react";
import { congregationCollection } from "@shared/database/collections/congregation";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Congregation } from "@shared/database/schemas/congregation";

interface UseAddCongregationProps {
  congregations: Congregation[];
  on_created: (congregation_id: string) => void;
}

export function useAddCongregation({ congregations, on_created }: UseAddCongregationProps) {
  const [presentToast] = useIonToast();
  const current_congregation_id = useStoredCongregation()?.id ?? "";

  async function add_congregation(name: string) {
    const trimmed_name = name.trim();
    if (!trimmed_name || !current_congregation_id) return;

    const is_duplicate = congregations.some(
      (c) => c.name.toLowerCase() === trimmed_name.toLowerCase(),
    );
    if (is_duplicate) {
      void presentToast({
        message: "A congregation with this name already exists",
        duration: 3000,
        color: "warning",
      });
      throw new Error("Duplicate congregation name");
    }

    try {
      const new_congregation_id = crypto.randomUUID();
      const tx = congregationCollection.insert({
        id: new_congregation_id,
        name: trimmed_name,
        congregation_id: current_congregation_id,
      });
      await tx.isPersisted.promise;
      on_created(new_congregation_id);
    } catch (error) {
      void presentToast({
        message: `Failed to add congregation: ${(error as Error).message}`,
        duration: 4000,
        color: "danger",
      });
      throw error;
    }
  }

  return { add_congregation };
}
