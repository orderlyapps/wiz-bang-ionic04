import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { eventCollection } from "@shared/database/collections/event";
import type { EventDetails, EventRow } from "@shared/database/schemas/event";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { Space } from "@ui/components/layout/space/Space";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { EventFormFields } from "./components/event-form-fields/EventFormFields";
import type { CircuitVisitFormDetails } from "./components/event-form-fields/types";

function toFormDetails(details?: EventDetails | null): CircuitVisitFormDetails {
  return {
    midweek_theme: details?.midweek_theme ?? "",
    weekend_theme: details?.weekend_theme ?? "",
    pioneer_meeting_time: details?.pioneer_meeting_time ?? "",
  };
}

interface EditEventContentProps {
  event_id?: string;
}

export function EditEventContent({ event_id }: EditEventContentProps) {
  const congregation = useStoredCongregation();
  const permissions = usePermissions();
  const history = useHistory();
  const can_edit =
    permissions.has_events || permissions.has_congregation_admin || permissions.is_super_admin;

  const { data: existing_event } = useLiveQuery(
    (q) =>
      event_id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) => eq(e.id, event_id))
            .select(({ e }) => ({
              id: e.id,
              congregation_id: e.congregation_id,
              name: e.name,
              description: e.description,
              address: e.address,
              type: e.type,
              all_day: e.all_day,
              start_date: e.start_date,
              start_time: e.start_time,
              end_date: e.end_date,
              end_time: e.end_time,
              coordinates: e.coordinates,
              details: e.details,
            }))
        : undefined,
    [event_id],
  );

  const event = existing_event?.[0];
  const is_new = !event_id;

  const [form, setForm] = useState({
    name: event?.name ?? "",
    description: event?.description ?? "",
    address: event?.address ?? "",
    type: event?.type ?? "",
    all_day: event?.all_day ?? false,
    start_date: event?.start_date ?? "",
    start_time: event?.start_time ?? "",
    end_date: event?.end_date ?? "",
    end_time: event?.end_time ?? "",
    details: toFormDetails(event?.details),
  });

  useEffect(() => {
    if (event) {
      setForm({
        name: event.name ?? "",
        description: event.description ?? "",
        address: event.address ?? "",
        type: event.type ?? "",
        all_day: event.all_day ?? false,
        start_date: event.start_date ?? "",
        start_time: event.start_time ?? "",
        end_date: event.end_date ?? "",
        end_time: event.end_time ?? "",
        details: toFormDetails(event.details),
      });
    }
  }, [event]);

  function handleFieldChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleDetailsChange(field: keyof CircuitVisitFormDetails, value: string) {
    setForm((prev) => ({ ...prev, details: { ...prev.details, [field]: value } }));
  }

  function handleSave() {
    if (!congregation?.id) return;
    const payload = {
      ...form,
      start_time: form.all_day ? null : form.start_time || null,
      end_date: form.end_date || null,
      end_time: form.all_day ? null : form.end_time || null,
      details:
        form.type === "circuit_visit"
          ? {
              midweek_theme: form.details.midweek_theme,
              weekend_theme: form.details.weekend_theme,
              pioneer_meeting_time: form.details.pioneer_meeting_time || null,
            }
          : null,
    };

    if (is_new) {
      eventCollection.insert({
        ...payload,
        type: form.type as EventRow["type"],
        id: crypto.randomUUID(),
        congregation_id: congregation.id,
        coordinates: null,
      });
      history.push("/home/events");
    } else if (event) {
      const key = makeCompositeKey(event.id, event.congregation_id);
      eventCollection.update(key, (draft) => {
        Object.assign(draft, payload);
      });
      history.push("/home/events");
    }
  }

  function handleDelete() {
    if (!event) return;
    const key = makeCompositeKey(event.id, event.congregation_id);
    eventCollection.delete(key);
    history.push("/home/events");
  }

  if (!can_edit) {
    return null;
  }

  return (
    <>
      <EventFormFields
        {...form}
        on_change={handleFieldChange}
        on_details_change={handleDetailsChange}
      />
      <Space size="lg" />
      <SaveTextButton
        variant={is_new ? "save" : "update"}
        disabled={!form.name || !form.start_date}
        on_click={handleSave}
      />
      {!is_new && (
        <>
          <Space size="sm" />
          <DeleteTextButton on_click={handleDelete} />
        </>
      )}
    </>
  );
}
