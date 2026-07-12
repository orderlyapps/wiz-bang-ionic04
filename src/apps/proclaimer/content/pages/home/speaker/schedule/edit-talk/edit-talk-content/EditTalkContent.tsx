import { useState } from "react";
import { useEditTalk } from "./hooks/use-edit-talk/useEditTalk";
import { SpeakerSelect } from "./components/speaker-select/SpeakerSelect";
import { OutlineSelect } from "./components/outline-select/OutlineSelect";
import { EditSpeakerOutlinesModal } from "./components/edit-speaker-outlines-modal/EditSpeakerOutlinesModal";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";

type EditTalkContentProps = {
  week_id: string;
};

export function EditTalkContent({ week_id }: EditTalkContentProps) {
  const [is_edit_outlines_open, set_is_edit_outlines_open] = useState(false);
  const {
    current_speaker_id,
    current_speaker_label,
    current_outline,
    current_outline_label,
    local_speakers,
    visiting_speakers,
    outlines,
    handleSelectSpeaker,
    handleSelectOutline,
    handleClearAssignment,
  } = useEditTalk({ week_id });

  return (
    <>
      <SpeakerSelect
        label="Speaker"
        value={current_speaker_id}
        placeholder={current_speaker_label ?? "Select Speaker"}
        local_speakers={local_speakers}
        visiting_speakers={visiting_speakers}
        on_change={handleSelectSpeaker}
      />
      <OutlineSelect
        label="Outline"
        value={current_outline?.id ?? null}
        placeholder={current_outline_label ?? "Select Outline"}
        outlines={outlines}
        on_change={handleSelectOutline}
        on_edit_outlines={() => set_is_edit_outlines_open(true)}
      />
      <EditSpeakerOutlinesModal
        is_open={is_edit_outlines_open}
        on_dismiss={() => set_is_edit_outlines_open(false)}
        speaker_id={current_speaker_id}
      />
      <Space size="lg" />
      <TextButton
        label="Clear Assignment"
        color="danger"
        on_click={handleClearAssignment}
        disabled={!current_speaker_id}
      />
    </>
  );
}
