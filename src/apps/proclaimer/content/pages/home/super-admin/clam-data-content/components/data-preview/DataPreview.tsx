import { Heading } from "@ui/components/display/text/heading/Heading";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import type { ParsedMeetingData as MeetingData } from "../../services/clam-data-service";
import { Space } from "@ui/components/layout/space/Space";

interface DataPreviewProps {
  data: MeetingData[];
  on_confirm: () => void;
  on_cancel: () => void;
  loading?: boolean;
}

export function DataPreview({ data, on_confirm, on_cancel, loading = false }: DataPreviewProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <Heading size="2xl">
        Parsed Meeting Data <br /> ({data.length} weeks)
      </Heading>
      <Space />

      {data.slice(0, 3).map((week) => (
        <div key={week.week_id}>
          <Heading size="md">{week.mwb_week_date_locale}</Heading>

          <LabelValueItem label="Bible Reading:" value={week.mwb_weekly_bible_reading} />

          <LabelValueItem label="First Song:" value={week.mwb_song_first.toString()} />

          <LabelValueItem
            label="TGW Talk:"
            value={week.mwb_tgw_talk_title ? week.mwb_tgw_talk_title : week.mwb_tgw_talk}
          />

          <LabelValueItem label="TGW Gems:" value={week.mwb_tgw_gems_title || "N/A"} />

          <LabelValueItem label="AYF Parts:" value={week.mwb_ayf_count.toString()} />

          <LabelValueItem label="LC Parts:" value={week.mwb_lc_count.toString()} />

          <LabelValueItem
            label="CBS:"
            value={
              week.mwb_lc_cbs_title
                ? `${week.mwb_lc_cbs} - ${week.mwb_lc_cbs_title}`
                : week.mwb_lc_cbs
            }
          />

          <Space />
        </div>
      ))}

      {data.length > 3 && (
        <p className="ion-text-center ion-margin-top">... and {data.length - 3} more weeks</p>
      )}

      <Space />

      <TextButton label="Cancel" fill="outline" on_click={on_cancel} disabled={loading} />

      <Space />

      <TextButton
        label={loading ? "Importing..." : `Import ${data.length} Weeks`}
        fill="solid"
        on_click={on_confirm}
        disabled={loading}
      />
    </>
  );
}
