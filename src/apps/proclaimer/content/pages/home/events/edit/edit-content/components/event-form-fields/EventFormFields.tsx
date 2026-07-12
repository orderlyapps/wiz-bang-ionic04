import { Select } from "@ui/components/inputs/select/Select";
import { eventTypeSchema } from "@shared/database/schemas/event";
import type { EventFormFieldProps } from "./types";
import { CircuitAssemblyForm } from "./components/circuit-assembly-form/CircuitAssemblyForm";
import { ConventionForm } from "./components/convention-form/ConventionForm";
import { MemorialForm } from "./components/memorial-form/MemorialForm";
import { CircuitVisitForm } from "./components/circuit-visit-form/CircuitVisitForm";
import { SpecialMeetingForm } from "./components/special-meeting-form/SpecialMeetingForm";
import { CampaignForm } from "./components/campaign-form/CampaignForm";
import { SpecialTalkForm } from "./components/special-talk-form/SpecialTalkForm";
import { OtherEventForm } from "./components/other-event-form/OtherEventForm";

const EVENT_TYPE_OPTIONS = eventTypeSchema.options.map((value) => ({
  label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  value,
}));

export function EventFormFields(props: EventFormFieldProps) {
  const { on_change } = props;

  function renderTypeForm() {
    switch (props.type) {
      case "circuit_assembly":
        return <CircuitAssemblyForm {...props} />;
      case "convention":
        return <ConventionForm {...props} />;
      case "memorial":
        return <MemorialForm {...props} />;
      case "circuit_visit":
        return <CircuitVisitForm {...props} />;
      case "special_meeting":
        return <SpecialMeetingForm {...props} />;
      case "campaign":
        return <CampaignForm {...props} />;
      case "special_talk":
        return <SpecialTalkForm {...props} />;
      default:
        return <OtherEventForm {...props} />;
    }
  }

  return (
    <>
      <Select
        label="Event"
        value={props.type}
        options={EVENT_TYPE_OPTIONS}
        placeholder="Select an event type"
        on_change={(v) => on_change("type", v as string)}
        interface_type="popover"
      />
      {props.type && renderTypeForm()}
    </>
  );
}
