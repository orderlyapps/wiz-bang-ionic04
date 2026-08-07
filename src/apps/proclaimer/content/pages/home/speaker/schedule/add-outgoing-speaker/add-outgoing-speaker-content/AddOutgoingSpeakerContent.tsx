import { Select } from "@ui/components/inputs/select/Select";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { OutlineSelect } from "@proclaimer-content/pages/home/speaker/schedule/edit-talk/edit-talk-content/components/outline-select/OutlineSelect";
import { EditSpeakerOutlinesModal } from "@proclaimer-content/pages/home/speaker/schedule/edit-talk/edit-talk-content/components/edit-speaker-outlines-modal/EditSpeakerOutlinesModal";
import { AddCongregationAlert } from "@proclaimer-shared/components/add-congregation-alert/AddCongregationAlert";
import { useAddOutgoingSpeakerForm } from "./hooks/use-add-outgoing-speaker-form/useAddOutgoingSpeakerForm";

export function AddOutgoingSpeakerContent({ week_id }: { week_id: string }) {
  const {
    selected_congregation_id,
    selected_speaker_id,
    selected_outline_id,
    congregation_options,
    speaker_options,
    outlines,
    is_speakers_loading,
    is_add_congregation_alert_open,
    set_is_add_congregation_alert_open,
    is_edit_outlines_open,
    set_is_edit_outlines_open,
    is_saving,
    can_save,
    handleSelectCongregation,
    handleSelectSpeaker,
    handleSelectOutline,
    handleAddCongregation,
    handleSave,
  } = useAddOutgoingSpeakerForm(week_id);

  return (
    <>
      <Select
        label="Congregation"
        value={selected_congregation_id}
        placeholder="Select Congregation"
        options={congregation_options}
        on_change={handleSelectCongregation}
      />
      <Select
        label="Speaker"
        value={selected_speaker_id}
        placeholder={is_speakers_loading ? "Loading..." : "Select Speaker"}
        disabled={!selected_congregation_id || is_speakers_loading}
        options={speaker_options}
        on_change={handleSelectSpeaker}
      />
      <OutlineSelect
        label="Outline"
        value={selected_outline_id}
        placeholder="Select Outline"
        outlines={outlines}
        disabled={!selected_speaker_id}
        on_change={handleSelectOutline}
        on_edit_outlines={() => set_is_edit_outlines_open(true)}
      />
      <EditSpeakerOutlinesModal
        is_open={is_edit_outlines_open}
        on_dismiss={() => set_is_edit_outlines_open(false)}
        speaker_id={selected_speaker_id ?? undefined}
      />
      <Space size="lg" />
      <TextButton label="Save" on_click={handleSave} disabled={!can_save || is_saving} />
      <AddCongregationAlert
        is_open={is_add_congregation_alert_open}
        on_dismiss={() => set_is_add_congregation_alert_open(false)}
        on_add={handleAddCongregation}
      />
    </>
  );
}
