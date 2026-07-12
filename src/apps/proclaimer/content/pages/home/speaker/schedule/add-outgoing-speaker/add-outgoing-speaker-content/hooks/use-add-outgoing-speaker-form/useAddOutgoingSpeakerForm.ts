import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useAddOutgoingSpeaker,
  ADD_NEW_CONGREGATION_VALUE,
} from "../use-add-outgoing-speaker/useAddOutgoingSpeaker";

export function useAddOutgoingSpeakerForm(week_id: string) {
  const history = useHistory();
  const [selected_congregation_id, set_selected_congregation_id] = useState<string | null>(null);
  const [selected_speaker_id, set_selected_speaker_id] = useState<string | null>(null);
  const [selected_outline_id, set_selected_outline_id] = useState<string | null>(null);
  const [is_add_congregation_alert_open, set_is_add_congregation_alert_open] = useState(false);
  const [is_edit_outlines_open, set_is_edit_outlines_open] = useState(false);
  const [is_saving, set_is_saving] = useState(false);

  const {
    congregation_options,
    speaker_options,
    outlines,
    can_save,
    is_speakers_loading,
    add_congregation,
    save,
  } = useAddOutgoingSpeaker({
    week_id,
    selected_congregation_id,
    selected_speaker_id,
    selected_outline_id,
  });

  function handleSelectCongregation(value: string | string[] | null) {
    const selected_value = (value as string) || null;
    if (selected_value === ADD_NEW_CONGREGATION_VALUE) {
      set_is_add_congregation_alert_open(true);
      return;
    }
    set_selected_congregation_id(selected_value);
    set_selected_speaker_id(null);
    set_selected_outline_id(null);
  }

  function handleSelectSpeaker(value: string | string[] | null) {
    const selected_value = (value as string) || null;
    set_selected_speaker_id(selected_value);
    set_selected_outline_id(null);
  }

  function handleSelectOutline(outline_id: string | null) {
    set_selected_outline_id(outline_id);
  }

  async function handleAddCongregation(name: string) {
    const id = await add_congregation(name);
    if (id) set_selected_congregation_id(id);
  }

  async function handleSave() {
    if (!can_save) return;
    set_is_saving(true);
    await save();
    set_is_saving(false);
    history.push(`/home/speaker/schedule/${week_id}`);
  }

  return {
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
  };
}
